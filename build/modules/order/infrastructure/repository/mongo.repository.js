var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import mongoose from "mongoose";
import { OrderModel } from "../model/order.schema";
import StatusModel from '../model/status.schema';
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import axios from 'axios';
import { ZoneModel } from "../../../zone/infrastructure/model/zone.schema";
import jwt from "jsonwebtoken";
import { VehicleModel } from "../../../vehicle/infrastructure/model/vehicle.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import { OrderSettingModel } from "../../../order/infrastructure/model/orderSetting.schema";
// import { Scheduler } from "timers/promises";
import schedule from "node-schedule";
export class MongoRepository {
    constructor() {
        this.maxAmountPerZone = 500000;
        this.ordersLimitPerZone = 5;
        this.pendingOrders = [];
        // private zoneTime = 5400000;
        this.zoneTime = 5400000;
        this.limitHour = 17;
        this.limitMinutes = 0;
        this.limitShipments = 5;
        this.openingHour = 7;
        this.openingMinutes = 0;
        this.cancelRegisterZoneTime = false;
    }
    findOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield OrderModel.find({ id });
            return user;
        });
    }
    registerOrder(order, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastSetting = yield OrderSettingModel.findOne().sort({ createdAt: -1 });
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
                    const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                        "grant_type": "client_credentials",
                        "client_id": "1007",
                        "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                    });
                    this.tokenR99 = token.data.access_token;
                }
                else {
                    const decoded = jwt.decode(this.tokenR99);
                    if (!decoded || !decoded.exp) {
                        return true; // El token no es válido o no tiene fecha de expiración
                    }
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    if (decoded.exp < currentTimestamp) {
                        const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                            "grant_type": "client_credentials",
                            "client_id": "1007",
                            "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                        });
                        this.tokenR99 = token.data.access_token;
                    }
                }
                if (!!postalCode) {
                    const zone = yield ZoneModel.findOne({ codes: parseInt(postalCode) });
                    const currentHour = new Date();
                    const previousLimitHour = new Date();
                    const limitDate = new Date();
                    previousLimitHour.setHours(this.limitHour - 1, this.limitMinutes, 0, 0);
                    limitDate.setHours(this.limitHour, this.limitMinutes, 0, 0);
                    let findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
                    if (currentHour >= limitDate) {
                        this.cancelRegisterZoneTime = true;
                        // console.log('La hora actual es mayor o igual a limitDate');
                        findedIndex !== -1 ? this.pendingOrders[findedIndex].orders.push(order) : this.pendingOrders.push({ zone, orders: [order] }); // Queda pendiente la orden porque no se puede despachar al ser tan tarde.
                        // Obtén la fecha y hora actual
                        const now = new Date();
                        // Calcula la fecha y hora para ejecutar la tarea el día siguiente
                        const nextDay = new Date(now);
                        nextDay.setDate(now.getDate() + 1);
                        // nextDay.setDate(now.getDate());
                        nextDay.setHours(this.openingHour, this.openingMinutes, 0, 0); // Establece la hora de apertura
                        if (findedIndex !== -1) {
                            // Programa la tarea para que se ejecute una sola vez en la fecha calculada
                            schedule.scheduleJob(nextDay, () => {
                                // Código que se ejecutará al día siguiente
                                this.cancelRegisterZoneTime = false;
                                console.log("asd1");
                                this.registerSyncWay(order, postalCode, zone, true, true);
                            });
                        }
                        else {
                            // Programa la tarea para que se ejecute una sola vez en la fecha calculada
                            schedule.scheduleJob(nextDay, () => {
                                // Código que se ejecutará al día siguiente
                                this.cancelRegisterZoneTime = false;
                                console.log("asd2");
                                this.registerSyncWay(order, postalCode, zone, false, true);
                            });
                        }
                        yield OrderModel.create(order);
                        return order;
                    }
                    findedIndex !== -1 ? this.pendingOrders[findedIndex].orders.push(order) : this.pendingOrders.push({ zone, orders: [order] });
                    if (findedIndex !== -1) {
                        let sumPerZone = 0;
                        for (const orderToCount of this.pendingOrders[findedIndex].orders) {
                            sumPerZone += orderToCount.value_to_collect;
                        }
                        //Casos para crear las ordenes a ruta99
                        if ((this.pendingOrders[findedIndex].orders.length >= this.ordersLimitPerZone && currentHour < previousLimitHour)
                            || (sumPerZone >= this.maxAmountPerZone && currentHour < previousLimitHour)
                            || (currentHour >= previousLimitHour && this.pendingOrders[findedIndex].orders.length <= this.limitShipments) // Hora actual mayor a la hora limite anterior y 5 ordenes
                        ) {
                            // Aqui se manda a ruta99
                            this.sendScenario(order, postalCode, zone);
                        }
                        else {
                            // Else para cuando no se cumplen las condiciones de arriba.
                            if (currentHour >= previousLimitHour && this.pendingOrders[findedIndex].orders.length > this.limitShipments) {
                                // If cuando se cumple que los pedidos dentro de la hora previa a la limite que sean mayores a limitShipments, queda para el otro dia
                                this.cancelRegisterZoneTime = true;
                                // Obtén la fecha y hora actual
                                const now = new Date();
                                // Calcula la fecha y hora para ejecutar la tarea el día siguiente
                                const nextDay = new Date(now);
                                nextDay.setDate(now.getDate() + 1); // Dia siguiente
                                // nextDay.setDate(now.getDate());// Mismo dia
                                nextDay.setHours(this.openingHour, this.openingMinutes, 0, 0); // Establece la hora de apertura
                                // Programa la tarea para que se ejecute una sola vez en la fecha calculada
                                schedule.scheduleJob(nextDay, () => {
                                    // Código que se ejecutará al día siguiente
                                    this.cancelRegisterZoneTime = false;
                                    this.registerSyncWay(order, postalCode, zone, false, true);
                                });
                                yield OrderModel.create(order);
                                return order;
                            }
                            else {
                                if (this.pendingOrders[findedIndex].orders.length === 1) { // cuando this.pendingOrders[findedIndex].orders.length es 1 es porque es la primera orden de la zona, ya que arriba se hace el primer push.
                                    this.registerSyncWay(order, postalCode, zone, false, false);
                                }
                                else {
                                    this.registerSyncWay(order, postalCode, zone, true, false);
                                }
                            }
                        }
                    }
                    else {
                        // Zona no encontrada (quiere decir que no hay ordenes en la zona)
                        if ((order.value_to_collect >= this.maxAmountPerZone)) {
                            this.sendScenario(order, postalCode, zone);
                        }
                        else {
                            this.registerSyncWay(order, postalCode, zone, false, false);
                            return order;
                        }
                    }
                }
                else
                    return "No postal code";
                return order;
            }
            catch (error) {
                console.log(error.response.data);
            }
        });
    }
    sendScenario(order, postalCode, zone) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
            let zoneVehicle = yield VehicleModel.findOne({
                $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
            });
            if (!!zoneVehicle)
                zoneVehicle = yield VehicleModel.findOne({
                    $and: [{ status: "active" }, { availability: "available" }]
                });
            if (!!zoneVehicle) {
                const depot = yield DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
                const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                const resScenario = yield axios.post(`https://api.ruta99.co/v1/scenario`, {
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
                    yield VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });
                    try {
                        for (var _d = true, _e = __asyncValues(this.pendingOrders[findedIndex].orders), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                            _c = _f.value;
                            _d = false;
                            try {
                                const myOrder = _c;
                                const resOrder = yield axios.post(`https://api.ruta99.co/v1/order`, {
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
                                    items: myOrder.products.map((product) => {
                                        return {
                                            quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                                            description: product.name,
                                            amount: product.price
                                        };
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
                                    yield OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
                                }
                            }
                            finally {
                                _d = true;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // console.log(this.pendingOrders);
                    this.pendingOrders[findedIndex].orders = [];
                    axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
                        headers: {
                            Authorization: `Bearer ${this.tokenR99}`
                        }
                    }).then((res) => {
                        console.log(res.data.message);
                        let secondInterval;
                        secondInterval = setInterval(() => {
                            axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
                                headers: {
                                    Authorization: `Bearer ${this.tokenR99}`
                                }
                            }).then((data) => __awaiter(this, void 0, void 0, function* () {
                                if (data.data.status === 'solved')
                                    clearInterval(secondInterval);
                            }));
                        }, 10000);
                    });
                    yield OrderModel.create(order);
                    return order;
                }
            }
            else {
                // Caso para cuando no hay vehículos disponibles
                this.onAvailableVehicles(order, postalCode, zone);
                console.log("onAvailable");
            }
        });
    }
    registerSyncWay(order, postalCode, zone, zoneFound, orderCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Register sync way");
            try {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    var _a, e_2, _b, _c;
                    if (!zoneFound) {
                        if (!this.cancelRegisterZoneTime) {
                            const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
                            if (findedIndex !== -1) {
                                const orderIndex = this.pendingOrders[findedIndex].orders.findIndex((myOrder) => myOrder.id === order.id);
                                // console.log(orderIndex);
                                if (orderIndex === -1)
                                    return; // si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
                            }
                            let zoneVehicle = yield VehicleModel.findOne({
                                $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
                            });
                            if (!!zoneVehicle)
                                zoneVehicle = yield VehicleModel.findOne({
                                    $and: [{ status: "active" }, { availability: "available" }]
                                });
                            if (!!zoneVehicle) {
                                const depot = yield DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
                                const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                                const resScenario = yield axios.post(`https://api.ruta99.co/v1/scenario`, {
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
                                    yield VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });
                                    try {
                                        // console.log(this.pendingOrders[findedIndex].orders);
                                        for (var _d = true, _e = __asyncValues(this.pendingOrders[findedIndex].orders), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                                            _c = _f.value;
                                            _d = false;
                                            try {
                                                const myOrder = _c;
                                                const resOrder = yield axios.post(`https://api.ruta99.co/v1/order`, {
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
                                                    items: myOrder.products.map((product) => {
                                                        return {
                                                            quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                                                            description: product.name,
                                                            amount: product.price
                                                        };
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
                                                    yield OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
                                                }
                                            }
                                            finally {
                                                _d = true;
                                            }
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                    // console.log(this.pendingOrders);
                                    this.pendingOrders[findedIndex].orders = [];
                                    axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
                                        headers: {
                                            Authorization: `Bearer ${this.tokenR99}`
                                        }
                                    }).then((res) => {
                                        console.log(res.data.message);
                                        let secondInterval;
                                        secondInterval = setInterval(() => {
                                            axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
                                                headers: {
                                                    Authorization: `Bearer ${this.tokenR99}`
                                                }
                                            }).then((data) => __awaiter(this, void 0, void 0, function* () {
                                                if (data.data.status === 'solved')
                                                    clearInterval(secondInterval);
                                            }));
                                        }, 10000);
                                    });
                                    // await OrderModel.create(order);
                                    // return order;
                                }
                            }
                            else {
                                // Caso para cuando no hay vehículos disponibles
                                this.onAvailableVehicles(order, postalCode, zone);
                                console.log("onAvailable");
                            }
                        }
                    }
                }), this.zoneTime); // zoneTime es el tiempo que se va a demorar en ejecutar
            }
            catch (error) {
                console.log(error.response.data.data);
            }
            if (!orderCreated)
                yield OrderModel.create(order);
            return order;
        });
    }
    onAvailableVehicles(order, postalCode, zone) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.searchingAvailableVehicles)
                return;
            const findedIndex = this.pendingOrders.findIndex(object => object.zone.id === zone.id);
            if (findedIndex !== -1) {
                const orderIndex = this.pendingOrders[findedIndex].orders.findIndex((myOrder) => myOrder.id === order.id);
                if (orderIndex === -1)
                    return; // si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
            }
            this.myInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                var _a, e_3, _b, _c;
                this.searchingAvailableVehicles = true;
                console.log("intentando");
                let zoneVehicle = yield VehicleModel.findOne({
                    $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
                });
                if (!!zoneVehicle)
                    zoneVehicle = yield VehicleModel.findOne({
                        $and: [{ status: "active" }, { availability: "available" }]
                    });
                if (!!zoneVehicle) {
                    clearInterval(this.myInterval);
                    const depot = yield DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 });
                    const myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                    const resScenario = yield axios.post(`https://api.ruta99.co/v1/scenario`, {
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
                        yield VehicleModel.updateOne({ id: zoneVehicle.id }, { $set: { availability: "busy" } });
                        try {
                            for (var _d = true, _e = __asyncValues(this.pendingOrders[findedIndex].orders), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                                _c = _f.value;
                                _d = false;
                                try {
                                    const myOrder = _c;
                                    const resOrder = yield axios.post(`https://api.ruta99.co/v1/order`, {
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
                                        items: myOrder.products.map((product) => {
                                            return {
                                                quantity: product.quantity < 0 ? (product.quantity) * -1 : product.quantity,
                                                description: product.name,
                                                amount: product.price
                                            };
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
                                        yield OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } });
                                    }
                                }
                                finally {
                                    _d = true;
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        // console.log(this.pendingOrders);
                        this.pendingOrders[findedIndex].orders = [];
                        axios.post(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/optimize`, {}, {
                            headers: {
                                Authorization: `Bearer ${this.tokenR99}`
                            }
                        }).then((res) => {
                            console.log(res.data.message);
                            let secondInterval;
                            secondInterval = setInterval(() => {
                                axios.get(`https://api.ruta99.co/v1/scenario/${resScenario.data.scenario.id}/fetch-best-solution`, {
                                    headers: {
                                        Authorization: `Bearer ${this.tokenR99}`
                                    }
                                }).then((data) => __awaiter(this, void 0, void 0, function* () {
                                    if (data.data.status === 'solved')
                                        clearInterval(secondInterval);
                                }));
                            }, 10000);
                        });
                    }
                }
            }), 5000);
            // await OrderModel.create(order);
            // return order;
        });
    }
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastSetting = yield OrderSettingModel.findOne().sort({ createdAt: -1 });
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
            const theLimitHour = this.limitHour < 10 ? `0${this.limitHour}` : this.limitHour; // Condicional para agregar un 0 o no.
            const theLimitMinutes = this.limitMinutes < 10 ? `0${this.limitMinutes}` : this.limitMinutes; // Condicional para agregar un 0 o no.
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
            };
        });
    }
    setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes) {
        return __awaiter(this, void 0, void 0, function* () {
            this.limitHour = limitHour;
            this.limitMinutes = limitMinutes;
            this.maxAmountPerZone = maxAmountPerZone;
            this.ordersLimitPerZone = ordersLimitPerZone;
            this.zoneTime = zoneTime;
            this.limitShipments = limitShipments;
            this.openingHour = openingHour;
            this.openingMinutes = openingMinutes;
            yield OrderSettingModel.create({
                limitHour: this.limitHour, limitMinutes: this.limitMinutes, maxAmountPerZone: this.maxAmountPerZone, ordersLimitPerZone: this.ordersLimitPerZone,
                zoneTime: this.zoneTime, limitShipments: this.limitShipments, openingHour: this.openingHour, openingMinutes: this.openingMinutes
            });
            // }
            return true;
        });
    }
    updateOrder(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderUpdated = yield OrderModel.findOneAndUpdate({ id }, order, {
                new: true,
            });
            return orderUpdated;
        });
    }
    allOrder(seller_id) {
        var _a, e_4, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            var orders = yield OrderModel.find({ seller_id: new mongoose.Types.ObjectId(seller_id) });
            orders = JSON.parse(JSON.stringify(orders));
            try {
                for (var _d = true, orders_1 = __asyncValues(orders), orders_1_1; orders_1_1 = yield orders_1.next(), _a = orders_1_1.done, !_a;) {
                    _c = orders_1_1.value;
                    _d = false;
                    try {
                        const order = _c;
                        order.guide_status = (yield StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name;
                        order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = orders_1.return)) yield _b.call(orders_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return orders;
        });
    }
    getOrdersPage(seller_id, pag) {
        var _a, e_5, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 6,
                sort: { createdAt: -1 }
            };
            var orders = yield OrderModel.paginate({ seller_id: new mongoose.Types.ObjectId(seller_id) }, options);
            orders = JSON.parse(JSON.stringify(orders));
            try {
                for (var _d = true, _e = __asyncValues(orders.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const order = _c;
                        order.guide_status = (yield StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name;
                        order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return orders;
        });
    }
    findOrderByGuide(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield OrderModel.findOne({ guide });
            return order;
        });
    }
    insertStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const statusToInsert = [
                { id: 1, name: "En procesamiento" },
                { id: 2, name: "Guía generada" },
                { id: 3, name: "Cancelado" },
                { id: 4, name: "Orden recogida" },
                { id: 5, name: "En reparto" },
                { id: 6, name: "Entregado" },
                { id: 7, name: "Devolución" },
            ];
            const status = yield StatusModel.create(statusToInsert);
            return status;
        });
    }
    updateStatus(id, guide_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedStatus = yield OrderModel.updateOne({ id: id }, { $set: { guide_status: guide_status } });
            return updatedStatus;
        });
    }
    allOrders(pag) {
        var _a, e_6, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 7,
                sort: { createdAt: -1 }
            };
            var result = yield OrderModel.paginate({}, options);
            const orders = JSON.parse(JSON.stringify(result));
            try {
                for (var _d = true, _e = __asyncValues(orders.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const order = _c;
                        order.guide_status = (yield StatusModel.findOne({ id: order.guide_status })).name;
                        order.seller = (yield SellerModel.findOne({ _id: order.seller_id })).name;
                        var fechaUtc = new Date("" + order.createdAt);
                        order.equalDates = order.createdAt === order.updatedAt;
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return orders;
        });
    }
    ordersDate(rol, date, seller_id) {
        var _a, e_7, _b, _c, _d, e_8, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            // , $lt: new Date(`${date}-01`)
            const theDate = date.split('-');
            const theYear = parseInt(theDate[0]);
            const theMonth = parseInt(theDate[1]);
            const theDay = parseInt(theDate[2]);
            if (rol === 'superuser') {
                let ordersDate = [];
                if (Number.isNaN(theDay)) {
                    ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) } });
                }
                else {
                    ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) } });
                }
                ordersDate = JSON.parse(JSON.stringify(ordersDate));
                try {
                    for (var _g = true, ordersDate_1 = __asyncValues(ordersDate), ordersDate_1_1; ordersDate_1_1 = yield ordersDate_1.next(), _a = ordersDate_1_1.done, !_a;) {
                        _c = ordersDate_1_1.value;
                        _g = false;
                        try {
                            const order = _c;
                            order.guide_status = (yield StatusModel.findOne({ id: order.guide_status })).name;
                            var fechaUtc = new Date("" + order.createdAt);
                            order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        }
                        finally {
                            _g = true;
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (!_g && !_a && (_b = ordersDate_1.return)) yield _b.call(ordersDate_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                return ordersDate;
            }
            else {
                let ordersDate = [];
                if (Number.isNaN(theDay)) {
                    ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-01`), $lt: new Date(`${theYear}-${theMonth + 1}-01`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
                }
                else {
                    ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${theYear}-${theMonth}-${theDay}`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
                }
                // for await (const order of ordersDate) {
                //   order.guide_status = (await StatusModel.findOne({ id: order.guide_status })).name;
                //   var fechaUtc = new Date("" + order.createdAt);
                //   order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                // }
                // console.log(ordersDate);
                let myOrders = [];
                try {
                    for (var _h = true, ordersDate_2 = __asyncValues(ordersDate), ordersDate_2_1; ordersDate_2_1 = yield ordersDate_2.next(), _d = ordersDate_2_1.done, !_d;) {
                        _f = ordersDate_2_1.value;
                        _h = false;
                        try {
                            const order = _f;
                            var fechaUtc = new Date("" + order.createdAt);
                            myOrders.push({
                                client_name: order.client_name,
                                client_surname: order.client_surname,
                                products: order.products,
                                value_to_collect: order.value_to_collect,
                                guide_status: (yield StatusModel.findOne({ id: order.guide_status })).name,
                                createdAt: new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10)
                            });
                        }
                        finally {
                            _h = true;
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (!_h && !_d && (_e = ordersDate_2.return)) yield _e.call(ordersDate_2);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                return myOrders;
            }
        });
    }
    authR99() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
            return 200;
        });
    }
    createScenario() {
        return __awaiter(this, void 0, void 0, function* () {
            let gmt5Now = new Date(new Date().getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
            const vehicles = yield axios.get(`https://api.ruta99.co/v1/vehicle`, {
                headers: {
                    Authorization: `Bearer ${this.tokenR99}`
                }
            });
            return vehicles.data.data;
            return 200;
        });
    }
    orderReports(start, ending, seller_id, rol) {
        var _a, e_9, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let ordersDate = [];
            if (rol === 'superuser') {
                ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) } }, {
                    guide: 1, depot_name: 1, client_name: 1, client_surname: 1, client_address: 1, client_address_detail: 1, client_city: 1, client_state: 1, client_telephone: 1,
                    guide_status: 1, products: 1, value_to_collect: 1, createdAt: 1
                });
                // ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) } });
            }
            else {
                ordersDate = yield OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) }, seller_id: new mongoose.Types.ObjectId(seller_id) });
            }
            // (await StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name
            const ordersDateWithNames = [];
            try {
                for (var _d = true, ordersDate_3 = __asyncValues(ordersDate), ordersDate_3_1; ordersDate_3_1 = yield ordersDate_3.next(), _a = ordersDate_3_1.done, !_a;) {
                    _c = ordersDate_3_1.value;
                    _d = false;
                    try {
                        const order = _c;
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
                            'Estado de orden': (yield StatusModel.findOne({ id: order.guide_status }, { name: 1 })).name,
                            Productos: order.products.map((p) => p.name).join(', '),
                            Cantidad: order.products.map((p) => p.quantity).join(', '),
                            'Valor a recoger': order.value_to_collect
                        });
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = ordersDate_3.return)) yield _b.call(ordersDate_3);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return ordersDateWithNames;
        });
    }
    recentOrders(rol, seller_id) {
        var _a, e_10, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: 1,
                limit: 10,
                // sort: { createdAt: -1 },
                select: { client_name: 1, client_surname: 1, products: 1, value_to_collect: 1, guide_status: 1 }
            };
            let recentOrders = [];
            if (rol === 'superuser') {
                recentOrders = yield OrderModel.paginate({ guide_status: "6" }, { options });
            }
            else {
                recentOrders = yield OrderModel.paginate({ guide_status: "6", seller_id: new mongoose.Types.ObjectId(seller_id) }, { options });
            }
            try {
                for (var _d = true, _e = __asyncValues(recentOrders.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const order = _c;
                        order.guide_status = (yield StatusModel.findOne({ id: order.guide_status })).name;
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return recentOrders;
        });
    }
    orderTraceability(code, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.tokenR99) {
                    const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                        "grant_type": "client_credentials",
                        "client_id": "1007",
                        "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                    });
                    this.tokenR99 = token.data.access_token;
                }
                else {
                    const decoded = jwt.decode(this.tokenR99);
                    if (!decoded || !decoded.exp) {
                        return true; // El token no es válido o no tiene fecha de expiración
                    }
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    if (decoded.exp < currentTimestamp) {
                        const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                            "grant_type": "client_credentials",
                            "client_id": "1007",
                            "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                        });
                        this.tokenR99 = token.data.access_token;
                    }
                }
                const myOrder = yield OrderModel.findOne({ guide: code }, { scenario_id: 1 });
                const resScenario = axios.get(`https://api.ruta99.co/v1/scenario/${myOrder.scenario_id}`, {
                    headers: {
                        Authorization: `Bearer ${this.tokenR99}`
                    }
                });
                resScenario.then(({ data }) => __awaiter(this, void 0, void 0, function* () {
                    if (data.data.status === 'approved')
                        yield VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map((v) => v.id) } }, { $set: { availability: "busy" } });
                    if (data.data.status === 'completed')
                        yield VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map((v) => v.id) } }, { $set: { availability: "available" } });
                    // console.log(data.data.vehicles);
                    // console.log(data.data.status);
                }));
            }
            catch (error) {
                console.log(error.response.data);
            }
            if (status === "loaded")
                return yield OrderModel.updateOne({ guide: code }, { $set: { guide_status: "4" } });
            if (status === "onroute")
                return yield OrderModel.updateOne({ guide: code }, { $set: { guide_status: "5" } });
            if (status === "completed")
                return yield OrderModel.updateOne({ guide: code }, { $set: { guide_status: "6" } });
            if (status === "fail")
                return yield OrderModel.updateOne({ guide: code }, { $set: { guide_status: "7" } });
            // return { code, status };
        });
    }
}
