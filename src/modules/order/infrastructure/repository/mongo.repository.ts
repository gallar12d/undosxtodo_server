import mongoose from "mongoose";
import { OrderEntity } from "../../domain/order.entity";
import { OrderRepository } from "../../domain/order.respository";
import { OrderModel } from "../model/order.schema";
import StatusModel from '../model/status.schema';
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import axios from 'axios';
// import { OrderValue } from "../../domain/order.value";
import { ZoneModel } from "../../../zone/infrastructure/model/zone.schema";
import jwt from "jsonwebtoken";
import { VehicleModel } from "../../../vehicle/infrastructure/model/vehicle.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import { OrderSettingModel } from "../../../order/infrastructure/model/orderSetting.schema";
// import { Scheduler } from "timers/promises";
import schedule from "node-schedule";
import { DateTime } from 'luxon';
import Shipday from 'shipday/integration';

export class MongoRepository implements OrderRepository {

  private maxAmountPerZone: number = 500000;
  private ordersLimitPerZone: number = 5;
  private pendingOrders: any[] = [];
  public tokenR99: string;
  private myInterval: any;
  // private zoneTime = 5400000;
  private zoneTime = 5400000;
  private limitHour = 17;
  private limitMinutes = 0;
  private limitShipments = 5;
  private openingHour = 7;
  private openingMinutes = 0;
  private shipdayClient: Shipday;

  public constructor() {
    this.shipdayClient = new Shipday('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
  }

  public async findOrder(id: string): Promise<any | null> {
    const user = await OrderModel.find({ id });
    return user;
  }


  public async registerOrder(order: OrderEntity, postalCode: any): Promise<any | null> {
    // try {

    const lastSetting = await OrderSettingModel.findOne().sort({ createdAt: -1 });
    if (!!lastSetting) {
      this.limitHour = lastSetting.limitHour;
      this.limitMinutes = lastSetting.limitMinutes;
      this.maxAmountPerZone = lastSetting.maxAmountPerZone;
      this.ordersLimitPerZone = lastSetting.ordersLimitPerZone;
      this.zoneTime = lastSetting.zoneTime;
      this.limitShipments = lastSetting.limitShipments;
      this.openingHour = lastSetting.openingHour;
      this.openingMinutes = lastSetting.openingMinutes;
    }

    // return;

    if (!this.tokenR99) {
      const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
        "grant_type": "client_credentials",
        "client_id": "1007",
        "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
      });

      this.tokenR99 = token.data.access_token;

    } else {
      const decoded: any = jwt.decode(this.tokenR99);
      if (!decoded || !decoded.exp) {
        return true; // El token no es válido o no tiene fecha de expiración
      }
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
          "grant_type": "client_credentials",
          "client_id": "1007",
          "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
        });

        this.tokenR99 = token.data.access_token;
      }
    }

    if (!!postalCode) {
      const zone = await ZoneModel.findOne({ codes: parseInt(postalCode) });

      const currentDate = DateTime.now().setZone('America/Bogota');
      const previousLimitDate = DateTime.now().setZone('America/Bogota').set({ hour: this.limitHour - 1, minute: this.limitMinutes });
      const limitDate = DateTime.now().setZone('America/Bogota').set({ hour: this.limitHour, minute: this.limitMinutes });
      const openingDate = DateTime.now().setZone('America/Bogota').set({ hour: this.openingHour, minute: this.openingMinutes });

      let findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);

      if ((currentDate >= limitDate && currentDate > openingDate) || (currentDate < limitDate && currentDate < openingDate)) {
        // console.log('La hora actual es mayor o igual a limitDate');
        findedIndex !== -1 ? this.pendingOrders[findedIndex].orders.push(order) : this.pendingOrders.push({ zone, orders: [order] });// Queda pendiente la orden porque no se puede despachar al ser tan tarde.

        const scheduleRule = new schedule.RecurrenceRule();
        scheduleRule.hour = openingDate.hour;
        scheduleRule.minute = openingDate.minute;
        scheduleRule.tz = "America/Bogota";
        if (findedIndex !== -1) {
          // Ttarea para que se ejecute una sola vez en la fecha calculada

          const myJob = schedule.scheduleJob(scheduleRule, () => {
            // Código que se ejecutará al día siguiente
            this.registerSyncWay(order, postalCode, zone, true, true, false);
            myJob.cancel();
          });
        } else {
          // Programa la tarea para que se ejecute una sola vez en la fecha calculada
          const myJob = schedule.scheduleJob(scheduleRule, () => {
            // Código que se ejecutará al día siguiente
            this.registerSyncWay(order, postalCode, zone, false, true, false);
            myJob.cancel();
          });
        }

        await OrderModel.create(order);
        return order;
      }
      findedIndex !== -1 ? this.pendingOrders[findedIndex].orders.push(order) : this.pendingOrders.push({ zone, orders: [order] });

      if (findedIndex !== -1) {

        let sumPerZone = 0;
        for (const orderToCount of this.pendingOrders[findedIndex].orders) {
          sumPerZone += orderToCount.value_to_collect;
        }

        //Casos para crear las ordenes a ruta99
        if ((this.pendingOrders[findedIndex].orders.length >= this.ordersLimitPerZone && currentDate < previousLimitDate)
          || (sumPerZone >= this.maxAmountPerZone && currentDate < previousLimitDate)
          || (currentDate >= previousLimitDate && this.pendingOrders[findedIndex].orders.length <= this.limitShipments) // Hora actual mayor a la hora limite anterior y 5 ordenes
        ) {
          // Aqui se manda a ruta99
          this.sendScenario(order, postalCode, zone);
        } else {
          // Else para cuando no se cumplen las condiciones de arriba.
          if (currentDate >= previousLimitDate && this.pendingOrders[findedIndex].orders.length > this.limitShipments) {
            // If cuando se cumple que los pedidos dentro de la hora previa a la limite que sean mayores a limitShipments, queda para el otro dia

            const scheduleRule = new schedule.RecurrenceRule();
            scheduleRule.hour = openingDate.hour;
            scheduleRule.minute = openingDate.minute;
            scheduleRule.tz = "America/Bogota";

            // Programa la tarea para que se ejecute una sola vez en la fecha calculada
            const myJob = schedule.scheduleJob(scheduleRule, () => {
              // Código que se ejecutará al día siguiente
              this.registerSyncWay(order, postalCode, zone, false, true, false);
              myJob.cancel();
            });

            await OrderModel.create(order);
            return order;
          } else {

            if (this.pendingOrders[findedIndex].orders.length === 1) {// cuando this.pendingOrders[findedIndex].orders.length es 1 es porque es la primera orden de la zona, ya que arriba se hace el primer push.
              this.registerSyncWay(order, postalCode, zone, false, false, false)
            } else {
              this.registerSyncWay(order, postalCode, zone, true, false, true);
            }
          }

        }
      } else {
        // Zona no encontrada (quiere decir que no hay ordenes en la zona)
        if ((order.value_to_collect >= this.maxAmountPerZone)) {
          this.sendScenario(order, postalCode, zone);
        } else {
          this.registerSyncWay(order, postalCode, zone, false, false, false);
          return order;
        }
      }

    } else return "No postal code";
    return order;
    // } catch (error) {
    //   console.log(error.response.data);

    // }

  }

  public async sendScenario(order: OrderEntity, postalCode: any, zone: any): Promise<any> {

    const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
    let zoneVehicle = await VehicleModel.findOne({// Primera busqueda para encontrar un vehiculo de la zona, activo y disponible.
      $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
    });

    if (!zoneVehicle) zoneVehicle = await VehicleModel.findOne({// Segunda busqueda para encontrar un vehiculo activo y disponible.
      $and: [{ status: "active" }, { availability: "available" }]
    });

    if (!!zoneVehicle) {

      const depot = await DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
      const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);

      const resScenario = await axios.post(`https://api.ruta99.co/v1/scenario`, {
        date: myDate,
        name: `Escenario ${myDate}`,
        depot_id: depot.ruta99_id,
        vehicles: [zoneVehicle.ruta99_id],
        service_time: 10,
        start_time: "08:00",
        end_time: "20:00"
      }, {
        headers: {
          Authorization: `Bearer ${this.tokenR99}`
        }
      });

      if (resScenario.status === 201) {
        await VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });

        for await (const myOrder of this.pendingOrders[findedIndex].orders) {

          const resOrder = await axios.post(`https://api.ruta99.co/v1/order`, {
            scenario_id: resScenario.data.scenario.id,
            code: myOrder.guide,
            country: "Colombia",
            state: myOrder.client_state,
            city: myOrder.client_city,
            address: myOrder.client_address,
            reference: myOrder.client_address_detail,
            zip_code: postalCode,
            demand: 1,
            packages: 1,
            customer: {
              code: "545345345",
              name: myOrder.client_name + " " + myOrder.client_surname,
              email: myOrder.client_email,
              phone: myOrder.client_telephone
            },
            items: myOrder.products.map((product: any) => {
              return {
                quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                description: product.name,
                amount: product.price
              }
            }),
            window_start_time: "08:00",
            window_end_time: "18:00",
            cash_on_delivery: myOrder.value_to_collect === 0 ? false : true,
            cash_amount: myOrder.value_to_collect,
            cash_currency: "COP",
            type: "delivery"
          }, {
            headers: {
              Authorization: `Bearer ${this.tokenR99}`
            }
          });
          if (resOrder.status === 201) {
            myOrder.scenario_id = resScenario.data.scenario.id;
            myOrder.ruta99_id = resOrder.data.order.id;
            await OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
          }
        }
        // console.log(this.pendingOrders);
        this.pendingOrders[findedIndex].orders = [];
        axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
          headers: {
            Authorization: `Bearer ${this.tokenR99}`
          }
        }).then((res) => {
          console.log(res.data.message);
          let secondInterval: any;
          secondInterval = setInterval(async () => {

            const scenarioStatus = await axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
              headers: {
                Authorization: `Bearer ${this.tokenR99}`
              }
            })

            if (scenarioStatus.status === 200) {
              if (scenarioStatus.data.status === 'solved') clearInterval(secondInterval);
            }
          }, 10000);
        });
        await OrderModel.create(order);
        return order;
      }

    } else {
      // Caso para cuando no hay vehículos disponibles
      this.onAvailableVehicles(order, postalCode, zone);
      await OrderModel.create(order);
      console.log("onAvailable");
    }
  }

  public async registerSyncWay(order: OrderEntity, postalCode: any, zone: any, zoneFound: boolean,
    orderCreated: boolean, cancelRegisterZoneTime: boolean): Promise<any> {
    console.log("Register sync way");

    // try {

    setTimeout(async () => {

      if (!zoneFound) {
        if (!cancelRegisterZoneTime) {
          const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
          if (findedIndex !== -1) {
            const orderIndex = this.pendingOrders[findedIndex].orders.findIndex((myOrder: OrderEntity) => myOrder.id === order.id);
            // console.log(orderIndex);
            if (orderIndex === -1) return;// si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
          }
          let zoneVehicle = await VehicleModel.findOne({// Primera busqueda para encontrar un vehiculo de la zona, activo y disponible.
            $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
          });

          if (!zoneVehicle) zoneVehicle = await VehicleModel.findOne({// Segunda busqueda para encontrar un vehiculo activo y disponible.
            $and: [{ status: "active" }, { availability: "available" }]
          });

          if (!!zoneVehicle) {

            const depot = await DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
            const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);

            const resScenario = await axios.post(`https://api.ruta99.co/v1/scenario`, {
              date: myDate,
              name: `Escenario ${myDate}`,
              depot_id: depot.ruta99_id,
              vehicles: [zoneVehicle.ruta99_id],
              service_time: 10,
              start_time: "08:00",
              end_time: "20:00"
            }, {
              headers: {
                Authorization: `Bearer ${this.tokenR99}`
              }
            });

            if (resScenario.status === 201) {
              await VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });
              // console.log(this.pendingOrders[findedIndex].orders);


              for await (const myOrder of this.pendingOrders[findedIndex].orders) {

                try {

                  const resOrder = await axios.post(`https://api.ruta99.co/v1/order`, {
                    scenario_id: resScenario.data.scenario.id,
                    code: myOrder.guide,
                    country: "Colombia",
                    state: myOrder.client_state,
                    city: myOrder.client_city,
                    address: myOrder.client_address,
                    reference: myOrder.client_address_detail,
                    zip_code: postalCode,
                    demand: 1,
                    packages: 1,
                    customer: {
                      code: "545345345",
                      name: myOrder.client_name + " " + myOrder.client_surname,
                      email: myOrder.client_email,
                      phone: myOrder.client_telephone
                    },
                    items: myOrder.products.map((product: any) => {
                      return {
                        quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                        description: product.name,
                        amount: product.price
                      }
                    }),
                    window_start_time: "08:00",
                    window_end_time: "18:00",
                    cash_on_delivery: myOrder.value_to_collect === 0 ? false : true,
                    cash_amount: myOrder.value_to_collect,
                    cash_currency: "COP",
                    type: "delivery"
                  }, {
                    headers: {
                      Authorization: `Bearer ${this.tokenR99}`
                    }
                  });
                  if (resOrder.status === 201) {
                    myOrder.scenario_id = resScenario.data.scenario.id;
                    myOrder.ruta99_id = resOrder.data.order.id;
                    await OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
                  }
                } catch (error) {
                  console.log(error.response.data);

                }
              }
              // console.log(this.pendingOrders);
              this.pendingOrders[findedIndex].orders = [];
              axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
                headers: {
                  Authorization: `Bearer ${this.tokenR99}`
                }
              }).then((res) => {
                console.log(res.data.message);
                let secondInterval: any;
                secondInterval = setInterval(async () => {

                  const scenarioStatus = await axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
                    headers: {
                      Authorization: `Bearer ${this.tokenR99}`
                    }
                  })

                  if (scenarioStatus.status === 200) {
                    if (scenarioStatus.data.status === 'solved') clearInterval(secondInterval);
                  }
                }, 10000);
              });
              // await OrderModel.create(order);
              // return order;
            }

          } else {
            // Caso para cuando no hay vehículos disponibles
            this.onAvailableVehicles(order, postalCode, zone);
            console.log("onAvailable");
          }
        }
      }

    }, this.zoneTime);// zoneTime es el tiempo que se va a demorar en ejecutar
    // } catch (error) {
    //   console.log(error.response.data.data);
    // }
    if (!orderCreated) await OrderModel.create(order);
    return order;
  }

  public async onAvailableVehicles(order: OrderEntity, postalCode: any, zone: any): Promise<any> {

    const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
    if (findedIndex !== -1) {
      const orderIndex = this.pendingOrders[findedIndex].orders.findIndex((myOrder: OrderEntity) => myOrder.id === order.id);
      if (orderIndex === -1) return;// si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
    }

    let theInterval: any;

    theInterval = setInterval(async () => {
      console.log("intentando");

      let zoneVehicle = await VehicleModel.findOne({// Primera busqueda para encontrar un vehiculo de la zona, activo y disponible.
        $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
      });

      if (!zoneVehicle) zoneVehicle = await VehicleModel.findOne({// Segunda busqueda para encontrar un vehiculo activo y disponible.
        $and: [{ status: "active" }, { availability: "available" }]
      });

      if (!!zoneVehicle) {
        clearInterval(theInterval);

        const depot = await DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
        const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);

        const resScenario = await axios.post(`https://api.ruta99.co/v1/scenario`, {
          date: myDate,
          name: `Escenario ${myDate}`,
          depot_id: depot.ruta99_id,
          vehicles: [zoneVehicle.ruta99_id],
          service_time: 10,
          start_time: "08:00",
          end_time: "20:00"
        }, {
          headers: {
            Authorization: `Bearer ${this.tokenR99}`
          }
        });

        if (resScenario.status === 201) {
          await VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });

          for await (const myOrder of this.pendingOrders[findedIndex].orders) {

            const resOrder = await axios.post(`https://api.ruta99.co/v1/order`, {
              scenario_id: resScenario.data.scenario.id,
              code: myOrder.guide,
              country: "Colombia",
              state: myOrder.client_state,
              city: myOrder.client_city,
              address: myOrder.client_address,
              reference: myOrder.client_address_detail,
              zip_code: postalCode,
              demand: 1,
              packages: 1,
              customer: {
                code: "545345345",
                name: myOrder.client_name + " " + myOrder.client_surname,
                email: myOrder.client_email,
                phone: myOrder.client_telephone
              },
              items: myOrder.products.map((product: any) => {
                return {
                  quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                  description: product.name,
                  amount: product.price
                }
              }),
              window_start_time: "08:00",
              window_end_time: "18:00",
              cash_on_delivery: myOrder.value_to_collect === 0 ? false : true,
              cash_amount: myOrder.value_to_collect,
              cash_currency: "COP",
              type: "delivery"
            }, {
              headers: {
                Authorization: `Bearer ${this.tokenR99}`
              }
            });
            if (resOrder.status === 201) {
              myOrder.scenario_id = resScenario.data.scenario.id;
              myOrder.ruta99_id = resOrder.data.order.id;
              await OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
            }
          }
          // console.log(this.pendingOrders);
          this.pendingOrders[findedIndex].orders = [];
          axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
            headers: {
              Authorization: `Bearer ${this.tokenR99}`
            }
          }).then((res) => {
            console.log(res.data.message);
            let secondInterval: any;
            secondInterval = setInterval(async () => {

              const scenarioStatus = await axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
                headers: {
                  Authorization: `Bearer ${this.tokenR99}`
                }
              })

              if (scenarioStatus.status === 200) {
                if (scenarioStatus.data.status === 'solved') clearInterval(secondInterval);
              }
            }, 10000);
          });

        }
      }
    }, 10000);
    // await OrderModel.create(order);
    // return order;
  }

  public async getSettings(): Promise<any> { // Getter para devolver las configuraciones
    const lastSetting = await OrderSettingModel.findOne().sort({ createdAt: -1 });
    if (!!lastSetting) {
      this.limitHour = lastSetting.limitHour;
      this.limitMinutes = lastSetting.limitMinutes;
      this.maxAmountPerZone = lastSetting.maxAmountPerZone;
      this.ordersLimitPerZone = lastSetting.ordersLimitPerZone;
      this.zoneTime = lastSetting.zoneTime;
      this.limitShipments = lastSetting.limitShipments;
      this.openingHour = lastSetting.openingHour;
      this.openingMinutes = lastSetting.openingMinutes;
    }

    const theLimitHour = this.limitHour < 10 ? `0${this.limitHour}` : this.limitHour;// Condicional para agregar un 0 o no.
    const theLimitMinutes = this.limitMinutes < 10 ? `0${this.limitMinutes}` : this.limitMinutes;// Condicional para agregar un 0 o no.
    const theOpHour = this.openingHour < 10 ? `0${this.openingHour}` : this.openingHour;
    const theOpMinutes = this.openingMinutes < 10 ? `0${this.openingMinutes}` : this.openingMinutes;
    // console.log(this.zoneTime);
    return {
      limitHour: `${theLimitHour}:${theLimitMinutes}`,
      maxAmountPerZone: this.maxAmountPerZone,
      ordersLimitPerZone: this.ordersLimitPerZone,
      zoneTime: this.zoneTime / 60000,
      limitShipments: this.limitShipments,
      openingHour: `${theOpHour}:${theOpMinutes}`,
    }
  }

  public async setSettings(limitHour: number, limitMinutes: number, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes): Promise<any> { // Setter para establecer las configuraciones
    this.limitHour = limitHour;
    this.limitMinutes = limitMinutes;
    this.maxAmountPerZone = maxAmountPerZone;
    this.ordersLimitPerZone = ordersLimitPerZone;
    this.zoneTime = zoneTime;
    this.limitShipments = limitShipments;
    this.openingHour = openingHour;
    this.openingMinutes = openingMinutes;

    await OrderSettingModel.create(
      {
        limitHour: this.limitHour, limitMinutes: this.limitMinutes, maxAmountPerZone: this.maxAmountPerZone, ordersLimitPerZone: this.ordersLimitPerZone,
        zoneTime: this.zoneTime, limitShipments: this.limitShipments, openingHour: this.openingHour, openingMinutes: this.openingMinutes
      }
    );
    // }


    return true;
  }

  public async updateOrder(id: string, order: OrderEntity): Promise<any | null> {
    const orderUpdated = await OrderModel.findOneAndUpdate({ id }, order, {
      new: true,
    });
    return orderUpdated;
  }

  public async allOrder(seller_id): Promise<any[] | null> {
    var orders = await OrderModel.find({ seller_id: new mongoose.Types.ObjectId(seller_id) });
    orders = JSON.parse(JSON.stringify(orders));

    for await (const order of orders) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name;
      order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
    }

    return orders;
  }

  public async getOrdersPage(seller_id, pag): Promise<any | null> {
    const options = {
      page: pag,
      limit: 6,
      sort: { createdAt: -1 }
    }
    var orders = await OrderModel.paginate({ seller_id: new mongoose.Types.ObjectId(seller_id) }, options);
    orders = JSON.parse(JSON.stringify(orders));

    for await (const order of orders.docs) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name;
      order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
    }

    return orders;
  }

  public async findOrderByGuide(guide: string): Promise<any | null> {
    const order = await OrderModel.findOne({ guide });
    return order;
  }

  public async insertStatus(): Promise<any | null> {
    const statusToInsert = [
      { id: 1, name: "En procesamiento" },
      { id: 2, name: "Guía generada" },
      { id: 3, name: "Cancelado" },
      { id: 4, name: "Orden recogida" },
      { id: 5, name: "En reparto" },
      { id: 6, name: "Entregado" },
      { id: 7, name: "Devolución" },
    ];
    const status = await StatusModel.create(statusToInsert);
    return status;
  }

  public async updateStatus(id: string, guide_status): Promise<any | null> {
    const updatedStatus = await OrderModel.updateOne({ id: id }, { $set: { guide_status: guide_status } });
    return updatedStatus;
  }

  public async allOrders(pag: number): Promise<any | null> {
    const options = {
      page: pag,
      limit: 7,
      sort: { createdAt: -1 }
    }

    var result = await OrderModel.paginate({}, options);
    const orders = JSON.parse(JSON.stringify(result));
    for await (const order of orders.docs) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
      order.seller = (await SellerModel.findOne({ _id: order.seller_id })).name
      order.equalDates = order.createdAt === order.updatedAt;
      order.createdAt = new Date().toISOString().slice(0, 10);
    }

    return orders;
  }


  public async ordersDate(rol: string, date: string, seller_id: string): Promise<any | null> {
    // , $lt: new Date(`${date}-01`)
    const theDate = date.split('-');
    const theYear = parseInt(theDate[0]);
    const theMonth = parseInt(theDate[1]);
    const theDay = parseInt(theDate[2]);

    if (rol === 'superuser') {
      let ordersDate = [];
      if (Number.isNaN(theDay)) {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) } });
      } else {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) } });
      }
      ordersDate = JSON.parse(JSON.stringify(ordersDate));
      for await (const order of ordersDate) {
        order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
        order.createdAt = new Date().toISOString().slice(0, 10);
      }
      return ordersDate;
    } else {
      let ordersDate = [];
      if (Number.isNaN(theDay)) {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
      } else {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
      }
      let myOrders = [];
      for await (const order of ordersDate) {
        myOrders.push({
          client_name: order.client_name,
          client_surname: order.client_surname,
          products: order.products,
          value_to_collect: order.value_to_collect,
          guide_status: (await StatusModel.findOne({ id: order.guide_status })).name,
          createdAt: new Date().toISOString().slice(0, 10)
        });
      }

      return myOrders;
    }
  }

  public async orderReports(start: string, ending: string, seller_id: string, rol: string): Promise<any | null> {
    let ordersDate = [];
    if (rol === 'superuser') {
      ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) } },
        {
          guide: 1, depot_name: 1, client_name: 1, client_surname: 1, client_address: 1, client_address_detail: 1, client_city: 1, client_state: 1, client_telephone: 1,
          guide_status: 1, products: 1, value_to_collect: 1, createdAt: 1
        })
      // ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) } });
    } else {
      ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
    }

    // (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name
    const ordersDateWithNames = [];

    for await (const order of ordersDate) {
      ordersDateWithNames.push({
        Fecha: new Date().toISOString().slice(0, 10),
        Guia: order.guide,
        Bodega: order.depot_name,
        'Nombre cliente': order.client_name,
        'Apellido cliente': order.client_surname,
        'Dirección': order.client_address,
        Detalle: order.client_address_detail,
        Ciudad: order.client_city,
        Departamento: order.client_state,
        'Teléfono': order.client_telephone,
        'Estado de orden': (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name,
        Productos: order.products.map((p: any) => p.name).join(', '),
        Cantidad: order.products.map((p: any) => p.quantity).join(', '),
        'Valor a recoger': order.value_to_collect
      });
    }
    return ordersDateWithNames;
  }

  public async recentOrders(rol: string, seller_id: string): Promise<any | null> {
    const options = {
      page: 1,
      limit: 10,
      // sort: { createdAt: -1 },
      select: { client_name: 1, client_surname: 1, products: 1, value_to_collect: 1, guide_status: 1 }
    }

    let recentOrders: any = [];
    if (rol === 'superuser') {
      recentOrders = await OrderModel.paginate({ guide_status: "6" }, { options });
    } else {
      recentOrders = await OrderModel.paginate({ guide_status: "6", seller_id: new mongoose.Types.ObjectId(seller_id) }, { options });
    }

    for await (const order of recentOrders.docs) {
      order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
    }
    return recentOrders;
  }

  public async orderTraceability(code: string, status: string): Promise<any | null> {

    try {

      if (!this.tokenR99) {
        const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
          "grant_type": "client_credentials",
          "client_id": "1007",
          "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
        });

        this.tokenR99 = token.data.access_token;

      } else {
        const decoded: any = jwt.decode(this.tokenR99);
        if (!decoded || !decoded.exp) {
          return true; // El token no es válido o no tiene fecha de expiración
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
          const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
            "grant_type": "client_credentials",
            "client_id": "1007",
            "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
          });

          this.tokenR99 = token.data.access_token;
        }
      }

      const myOrder = await OrderModel.findOne({ guide: code }, { scenario_id: 1 });

      const resScenario = axios.get(`https://api.ruta99.co/v1/scenario/${myOrder.scenario_id}`, {
        headers: {
          Authorization: `Bearer ${this.tokenR99}`
        }
      });
      resScenario.then(async ({ data }) => {
        if (data.data.status === 'approved') await VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map((v) => v.id) } }, { $set: { availability: "busy" } });
        if (data.data.status === 'completed') await VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map((v) => v.id) } }, { $set: { availability: "available" } });
        // console.log(data.data.vehicles);
        // console.log(data.data.status);
      });

    } catch (error) {
      console.log(error.response.data);

    }

    if (status === "loaded") return await OrderModel.updateOne({ guide: code }, { $set: { guide_status: "4" } });
    if (status === "onroute") return await OrderModel.updateOne({ guide: code }, { $set: { guide_status: "5" } });
    if (status === "completed") return await OrderModel.updateOne({ guide: code }, { $set: { guide_status: "6" } });
    if (status === "fail") return await OrderModel.updateOne({ guide: code }, { $set: { guide_status: "7" } });
    // return { code, status };
  }
}