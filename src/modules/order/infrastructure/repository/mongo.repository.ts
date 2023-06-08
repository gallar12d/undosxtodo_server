import mongoose from "mongoose";
import { OrderEntity } from "../../domain/order.entity";
import { OrderRepository } from "../../domain/order.respository";
import { OrderModel } from "../model/order.schema";
import StatusModel from '../model/status.schema';
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import axios from 'axios';
var tokenR99 = '';
var nroPeticiones = 0;

export class MongoRepository implements OrderRepository {
  public async findOrder(id: string): Promise<any | null> {
    const user = await OrderModel.find({ id });
    return user;
  }


  public async registerOrder(order: OrderEntity): Promise<any | null> {
    const orderCreated = await OrderModel.create(order);
    return orderCreated;
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
      var fechaUtc = new Date("" + order.createdAt);
      order.equalDates= order.createdAt === order.updatedAt;
      order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
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
        var fechaUtc = new Date("" + order.createdAt);
        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
      }
      return ordersDate;
    } else {
      let ordersDate = [];
      if (Number.isNaN(theDay)) {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
      } else {
        ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
      }
      for await (const order of ordersDate) {
        order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
        var fechaUtc = new Date("" + order.createdAt);
        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
      }
      return ordersDate;
    }
  }

  public async authR99(): Promise<any | null> {
    const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
      "grant_type": "client_credentials",
      "client_id": "1007",
      "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
    });

    tokenR99 = token.data.access_token;
    return 200;
  }



  public async createScenario(): Promise<any | null> {
    if (nroPeticiones >= 1) return;
    let gmt5Now = new Date(new Date().getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    const vehicles = await axios.get(`https://api.ruta99.co/v1/vehicle`, {
      headers: {
        Authorization: `Bearer ${tokenR99}`
      }
    });

    // console.log(vehicles.data.data);
    // console.log(vehicles.data.data.map((v: any) => v.id));

    // const newScenario = await axios.post(`https://api.ruta99.co/v1/scenario`, {
    //   "date": `${gmt5Now}`,
    //   "name": "Escenario mil",
    //   "depot_id": 1,
    //   "vehicles": vehicles.data.data.map((v: any) => v.id),
    //   "service_time": 10,
    //   "start_time": "12:00",
    //   "end_time": "20:00"
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': `Bearer ${tokenR99}`
    //   }
    // });
    // console.log(newScenario.data.scenario);

    // const newOrder = await axios.post(`https://api.ruta99.co/v1/order`, {
    //   "scenario_id": newScenario.data.scenario.id,
    //   "code": "ULTM01000",
    //   "country": "Mexico",
    //   "state": "Estado de mexico",
    //   "city": "Nezahualcoyotl",
    //   "address": "C. 9 12, Col Metropolitana, Nezahualcoyotl, 57420",
    //   "reference": "White house",
    //   "zip_code": "170150",
    //   "demand": 1,
    //   "packages": 1,
    //   "customer": {
    //     "code": "545345345",
    //     "name": "Aaron Bernal",
    //     "email": "aaron.bernal@99minutos.com",
    //     "phone": "321654987"
    //   },
    //   "items": [
    //     {
    //       "quantity": 3,
    //       "description": "Item 1 description",
    //       "amount": 300
    //     },
    //     {
    //       "quantity": 1,
    //       "description": "Item 2 description",
    //       "amount": 100
    //     },
    //     {
    //       "quantity": 1,
    //       "description": "Item 1 description",
    //       "amount": 100
    //     }
    //   ],
    //   "window_start_time": "08:00",
    //   "window_end_time": "18:00",
    //   "cash_on_delivery": true,
    //   "cash_amount": 500.00,
    //   "cash_currency": "MXN",
    //   "type": "delivery"
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': `Bearer ${tokenR99}`
    //   }
    // });
    // console.log(newOrder.data);

    // const deletedScenario = await axios.delete(`https://api.ruta99.co/v1/scenario/23`, {
    //   headers: {
    //     Authorization: `Bearer ${tokenR99}`
    //   }
    // });
    // console.log(deletedScenario.data);

    // const scenarios = await axios.get(`https://api.ruta99.co/v1/scenario`, {
    //   headers: {
    //     Authorization: `Bearer ${tokenR99}`
    //   }
    // });
    // console.log(scenarios.data.data);

    // const orders = await axios.get(`https://api.ruta99.co/v1/order`, {
    //   headers: {
    //     Authorization: `Bearer ${tokenR99}`
    //   }
    // });
    // console.log(orders.data.data);
    nroPeticiones++;
    return vehicles.data.data;
    return 200;
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
        Fecha: new Date(new Date("" + order.createdAt).getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10),
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
}
