"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var order_schema_1 = require("../model/order.schema");
var status_schema_1 = __importDefault(require("../model/status.schema"));
var seller_schema_1 = require("../../../seller/infrastructure/model/seller.schema");
var axios_1 = __importDefault(require("axios"));
var zone_schema_1 = require("../../../zone/infrastructure/model/zone.schema");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var vehicle_schema_1 = require("../../../vehicle/infrastructure/model/vehicle.schema");
var depot_schema_1 = require("../../../depot/infrastructure/model/depot.schema");
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.maxAmountPerZone = 500000;
        this.orderLimitPerZone = 5;
        this.pendingOrders = [];
    }
    MongoRepository.prototype.findOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.find({ id: id })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MongoRepository.prototype.registerOrder = function (order, postalCode) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, currentTimestamp, token, zone_1, currentHour, previousLimitHour, limitHour, findedIndex, sumPerZone, _i, _d, orderToCount, zoneVehicles_1, depot, myDate, resScenario_1, _e, _f, _g, myOrder, resOrder, e_1_1, error_1;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 39, , 40]);
                        if (!!this.tokenR99) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 1:
                        token = _h.sent();
                        this.tokenR99 = token.data.access_token;
                        return [3 /*break*/, 4];
                    case 2:
                        decoded = jsonwebtoken_1.default.decode(this.tokenR99);
                        if (!decoded || !decoded.exp) {
                            return [2 /*return*/, true]; // El token no es válido o no tiene fecha de expiración
                        }
                        currentTimestamp = Math.floor(Date.now() / 1000);
                        if (!(decoded.exp < currentTimestamp)) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 3:
                        token = _h.sent();
                        this.tokenR99 = token.data.access_token;
                        _h.label = 4;
                    case 4:
                        if (!!!postalCode) return [3 /*break*/, 37];
                        return [4 /*yield*/, zone_schema_1.ZoneModel.findOne({ codes: parseInt(postalCode) })];
                    case 5:
                        zone_1 = _h.sent();
                        currentHour = new Date();
                        previousLimitHour = new Date();
                        limitHour = new Date();
                        previousLimitHour.setHours(16, 0, 0, 0);
                        limitHour.setHours(17, 0, 0, 0);
                        if (!!this.pendingOrders.length) return [3 /*break*/, 6];
                        if (currentHour > previousLimitHour || currentHour > limitHour) {
                            // console.log('La hora actual es mayor a las 4 p.m.');
                            this.pendingOrders.push({ zone: zone_1, orders: [order] });
                            return [2 /*return*/, order];
                        }
                        else {
                            // console.log('La hora actual es igual o anterior a las 4 p.m.');
                            this.pendingOrders.push({ zone: zone_1, orders: [order] });
                            this.registerSyncWay(order, postalCode, zone_1, false);
                        }
                        return [2 /*return*/, order];
                    case 6:
                        findedIndex = this.pendingOrders.findIndex(function (object) { return object.zone.id === zone_1.id; });
                        if (!(findedIndex !== -1)) return [3 /*break*/, 35];
                        if (currentHour > limitHour) {
                            // console.log('La hora actual es mayor a las 5 p.m.');
                            this.pendingOrders[findedIndex].orders.push(order); // Queda pendiente la orden porque no se puede despachar porque ya es muy tarde.
                            return [2 /*return*/, order];
                        }
                        this.pendingOrders[findedIndex].orders.push(order);
                        sumPerZone = 0;
                        // if (currentHour > limitHour) this.pendingOrders[findedIndex].orders.push(order);
                        for (_i = 0, _d = this.pendingOrders[findedIndex].orders; _i < _d.length; _i++) {
                            orderToCount = _d[_i];
                            sumPerZone += orderToCount.value_to_collect;
                        }
                        if (!(this.pendingOrders[findedIndex].orders.length === this.orderLimitPerZone
                            || sumPerZone >= this.maxAmountPerZone
                            || (currentHour > previousLimitHour && this.pendingOrders[findedIndex].orders.length <= 5)) // Hora actual mayor a la hora limite anterior y 5 ordenes
                        ) return [3 /*break*/, 33]; // Hora actual mayor a la hora limite anterior y 5 ordenes
                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                $and: [{ zone_id: zone_1.id }, { status: "active" }, { availability: "available" }]
                            })];
                    case 7:
                        zoneVehicles_1 = _h.sent();
                        if (!(zoneVehicles_1.length === 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                $and: [{ status: "active" }, { availability: "available" }]
                            })];
                    case 8:
                        zoneVehicles_1 = _h.sent();
                        _h.label = 9;
                    case 9:
                        if (!(zoneVehicles_1.length > 0)) return [3 /*break*/, 31];
                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 })];
                    case 10:
                        depot = _h.sent();
                        myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/scenario", {
                                date: myDate,
                                name: "Escenario ".concat(myDate),
                                depot_id: depot.ruta99_id,
                                vehicles: zoneVehicles_1.map(function (vehicle) { return vehicle.ruta99_id; }),
                                service_time: 10,
                                start_time: "08:00",
                                end_time: "20:00"
                            }, {
                                headers: {
                                    Authorization: "Bearer ".concat(this.tokenR99)
                                }
                            })];
                    case 11:
                        resScenario_1 = _h.sent();
                        if (!(resScenario_1.status === 201)) return [3 /*break*/, 30];
                        _h.label = 12;
                    case 12:
                        _h.trys.push([12, 22, 23, 28]);
                        _e = true, _f = __asyncValues(this.pendingOrders[findedIndex].orders);
                        _h.label = 13;
                    case 13: return [4 /*yield*/, _f.next()];
                    case 14:
                        if (!(_g = _h.sent(), _a = _g.done, !_a)) return [3 /*break*/, 21];
                        _c = _g.value;
                        _e = false;
                        _h.label = 15;
                    case 15:
                        _h.trys.push([15, , 19, 20]);
                        myOrder = _c;
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/order", {
                                scenario_id: resScenario_1.data.scenario.id,
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
                                items: myOrder.products.map(function (product) {
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
                                    Authorization: "Bearer ".concat(this.tokenR99)
                                }
                            })];
                    case 16:
                        resOrder = _h.sent();
                        if (!(resOrder.status === 201)) return [3 /*break*/, 18];
                        myOrder.scenario_id = resScenario_1.data.scenario.id;
                        myOrder.ruta99_id = resOrder.data.order.id;
                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } })];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        _e = true;
                        return [7 /*endfinally*/];
                    case 20: return [3 /*break*/, 13];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 28];
                    case 23:
                        _h.trys.push([23, , 26, 27]);
                        if (!(!_e && !_a && (_b = _f.return))) return [3 /*break*/, 25];
                        return [4 /*yield*/, _b.call(_f)];
                    case 24:
                        _h.sent();
                        _h.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 27: return [7 /*endfinally*/];
                    case 28:
                        // console.log(this.pendingOrders);
                        this.pendingOrders[findedIndex].orders = [];
                        axios_1.default.post("https://api.ruta99.co/v1/scenario/".concat(resScenario_1.data.scenario.id, "/optimize"), {}, {
                            headers: {
                                Authorization: "Bearer ".concat(this.tokenR99)
                            }
                        }).then(function (res) {
                            console.log(res.data.message);
                            var secondInterval;
                            secondInterval = setInterval(function () {
                                axios_1.default.get("https://api.ruta99.co/v1/scenario/".concat(resScenario_1.data.scenario.id, "/fetch-best-solution"), {
                                    headers: {
                                        Authorization: "Bearer ".concat(_this.tokenR99)
                                    }
                                }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(data.data.status === 'solved')) return [3 /*break*/, 2];
                                                clearInterval(secondInterval);
                                                return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ id: { $in: zoneVehicles_1.map(function (v) { return v.id; }) } }, { $set: { availability: "busy" } })];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }, 10000);
                        });
                        return [4 /*yield*/, order_schema_1.OrderModel.create(order)];
                    case 29:
                        _h.sent();
                        return [2 /*return*/, order];
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        // Caso para cuando no hay vehículos disponibles
                        this.onAvailableVehicles(order, postalCode, zone_1);
                        console.log("onAvailable");
                        _h.label = 32;
                    case 32: return [3 /*break*/, 34];
                    case 33:
                        // Else para cuando no se cumplen las condiciones de que sean 10 órdenes y que no superan 500 mil pesos.
                        if (this.pendingOrders[findedIndex].orders.length === 1) { // cuando this.pendingOrders[findedIndex].orders.length es 1 es porque es la primera orden de la zona, ya que arriba se hace el primer push.
                            this.registerSyncWay(order, postalCode, zone_1, false);
                        }
                        else {
                            this.registerSyncWay(order, postalCode, zone_1, true);
                        }
                        _h.label = 34;
                    case 34: return [3 /*break*/, 36];
                    case 35:
                        // Else para cuando no se encontró la zona de la orden ingresada.
                        if (currentHour > limitHour) {
                            // console.log('La hora actual es mayor a las 5 p.m.');
                            this.pendingOrders.push({ zone: zone_1, orders: [order] }); // Queda pendiente la orden porque no se puede despachar porque ya es muy tarde.
                            return [2 /*return*/, order];
                        }
                        this.pendingOrders.push({ zone: zone_1, orders: [order] });
                        this.registerSyncWay(order, postalCode, zone_1, false);
                        // return await OrderModel.create(order);
                        // console.log(this.pendingOrders);
                        return [2 /*return*/, order];
                    case 36: return [3 /*break*/, 38];
                    case 37: return [2 /*return*/, "No postal code"];
                    case 38: 
                    // console.log(this.pendingOrders);
                    // return this.orderCounter;
                    return [2 /*return*/, order];
                    case 39:
                        error_1 = _h.sent();
                        console.log(error_1.response.data);
                        return [3 /*break*/, 40];
                    case 40: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.registerSyncWay = function (order, postalCode, zone, zoneFound) {
        return __awaiter(this, void 0, void 0, function () {
            var minuto;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        minuto = 60000;
                        // const dosminutos = 60000 * 2;
                        console.log("Register sync way");
                        try {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var findedIndex_1, orderIndex, zoneVehicles_2, depot, myDate, reqScenario;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!zoneFound) return [3 /*break*/, 6];
                                            findedIndex_1 = this.pendingOrders.findIndex(function (object) { return object.zone.id === zone.id; });
                                            if (findedIndex_1 !== -1) {
                                                orderIndex = this.pendingOrders[findedIndex_1].orders.findIndex(function (myOrder) { return myOrder.id === order.id; });
                                                // console.log(orderIndex);
                                                if (orderIndex === -1)
                                                    return [2 /*return*/]; // si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
                                            }
                                            return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                                    $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
                                                })];
                                        case 1:
                                            zoneVehicles_2 = _a.sent();
                                            if (!(zoneVehicles_2.length === 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                                    $and: [{ status: "active" }, { availability: "available" }]
                                                })];
                                        case 2:
                                            zoneVehicles_2 = _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            if (!(zoneVehicles_2.length > 0)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 })];
                                        case 4:
                                            depot = _a.sent();
                                            myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                                            reqScenario = axios_1.default.post("https://api.ruta99.co/v1/scenario", {
                                                date: myDate,
                                                name: "Escenario ".concat(myDate),
                                                depot_id: depot.ruta99_id,
                                                vehicles: zoneVehicles_2.map(function (vehicle) { return vehicle.ruta99_id; }),
                                                service_time: 10,
                                                start_time: "08:00",
                                                end_time: "20:00"
                                            }, {
                                                headers: {
                                                    Authorization: "Bearer ".concat(this.tokenR99)
                                                }
                                            });
                                            reqScenario.then(function (resScenario) { return __awaiter(_this, void 0, void 0, function () {
                                                var _a, _b, _c, myOrder, reqOrder, e_2_1;
                                                var _this = this;
                                                var _d, e_2, _e, _f;
                                                return __generator(this, function (_g) {
                                                    switch (_g.label) {
                                                        case 0:
                                                            _g.trys.push([0, 10, 11, 16]);
                                                            _a = true, _b = __asyncValues(this.pendingOrders[findedIndex_1].orders);
                                                            _g.label = 1;
                                                        case 1: return [4 /*yield*/, _b.next()];
                                                        case 2:
                                                            if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 9];
                                                            _f = _c.value;
                                                            _a = false;
                                                            _g.label = 3;
                                                        case 3:
                                                            _g.trys.push([3, , 7, 8]);
                                                            myOrder = _f;
                                                            return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/order", {
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
                                                                    items: myOrder.products.map(function (product) {
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
                                                                        Authorization: "Bearer ".concat(this.tokenR99)
                                                                    }
                                                                })];
                                                        case 4:
                                                            reqOrder = _g.sent();
                                                            if (!(reqOrder.status === 201)) return [3 /*break*/, 6];
                                                            myOrder.scenario_id = resScenario.data.scenario.id;
                                                            myOrder.ruta99_id = reqOrder.data.order.id;
                                                            return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id } })];
                                                        case 5:
                                                            _g.sent();
                                                            _g.label = 6;
                                                        case 6: return [3 /*break*/, 8];
                                                        case 7:
                                                            _a = true;
                                                            return [7 /*endfinally*/];
                                                        case 8: return [3 /*break*/, 1];
                                                        case 9: return [3 /*break*/, 16];
                                                        case 10:
                                                            e_2_1 = _g.sent();
                                                            e_2 = { error: e_2_1 };
                                                            return [3 /*break*/, 16];
                                                        case 11:
                                                            _g.trys.push([11, , 14, 15]);
                                                            if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 13];
                                                            return [4 /*yield*/, _e.call(_b)];
                                                        case 12:
                                                            _g.sent();
                                                            _g.label = 13;
                                                        case 13: return [3 /*break*/, 15];
                                                        case 14:
                                                            if (e_2) throw e_2.error;
                                                            return [7 /*endfinally*/];
                                                        case 15: return [7 /*endfinally*/];
                                                        case 16:
                                                            this.pendingOrders[findedIndex_1].orders = [];
                                                            axios_1.default.post("https://api.ruta99.co/v1/scenario/".concat(resScenario.data.scenario.id, "/optimize"), {}, {
                                                                headers: {
                                                                    Authorization: "Bearer ".concat(this.tokenR99)
                                                                }
                                                            }).then(function (res) {
                                                                // console.log(res.data.message);
                                                                var secondInterval;
                                                                secondInterval = setInterval(function () {
                                                                    axios_1.default.get("https://api.ruta99.co/v1/scenario/".concat(resScenario.data.scenario.id, "/fetch-best-solution"), {
                                                                        headers: {
                                                                            Authorization: "Bearer ".concat(_this.tokenR99)
                                                                        }
                                                                    }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    if (!(data.data.status === 'solved')) return [3 /*break*/, 2];
                                                                                    clearInterval(secondInterval);
                                                                                    return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ id: { $in: zoneVehicles_2.map(function (v) { return v.id; }) } }, { $set: { availability: "busy" } })];
                                                                                case 1:
                                                                                    _a.sent();
                                                                                    _a.label = 2;
                                                                                case 2: return [2 /*return*/];
                                                                            }
                                                                        });
                                                                    }); });
                                                                }, 10000);
                                                            });
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [3 /*break*/, 6];
                                        case 5:
                                            //Else para cuando no hay vehiculos diponibles
                                            this.onAvailableVehicles(order, postalCode, zone);
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); }, 5000);
                        }
                        catch (error) {
                            console.log(error.response);
                        }
                        return [4 /*yield*/, order_schema_1.OrderModel.create(order)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    MongoRepository.prototype.onAvailableVehicles = function (order, postalCode, zone) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaHora, findedIndex, orderIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.searchingAvailableVehicles)
                            return [2 /*return*/];
                        mediaHora = 1800000;
                        findedIndex = this.pendingOrders.findIndex(function (object) { return object.zone.id === zone.id; });
                        if (findedIndex !== -1) {
                            orderIndex = this.pendingOrders[findedIndex].orders.findIndex(function (myOrder) { return myOrder.id === order.id; });
                            if (orderIndex === -1)
                                return [2 /*return*/]; // si orderIndex es -1 quiere decir que ya han sido despachadas las ordenes.
                        }
                        // let myInterval: any;
                        this.myInterval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var zoneVehicles, depot, myDate, resScenario_2, _a, _b, _c, myOrder, resOrder, e_3_1;
                            var _this = this;
                            var _d, e_3, _e, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        this.searchingAvailableVehicles = true;
                                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                                $and: [{ zone_id: zone.id }, { status: "active" }, { availability: "available" }]
                                            })];
                                    case 1:
                                        zoneVehicles = _g.sent();
                                        if (!(zoneVehicles.length === 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({
                                                $and: [{ status: "active" }, { availability: "available" }]
                                            })];
                                    case 2:
                                        zoneVehicles = _g.sent();
                                        _g.label = 3;
                                    case 3:
                                        if (!(zoneVehicles.length > 0)) return [3 /*break*/, 24];
                                        clearInterval(this.myInterval);
                                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: order.depot_id }, { ruta99_id: 1 })];
                                    case 4:
                                        depot = _g.sent();
                                        myDate = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
                                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/scenario", {
                                                date: myDate,
                                                name: "Escenario ".concat(myDate),
                                                depot_id: depot.ruta99_id,
                                                vehicles: zoneVehicles.map(function (vehicle) { return vehicle.ruta99_id; }),
                                                service_time: 10,
                                                start_time: "08:00",
                                                end_time: "20:00"
                                            }, {
                                                headers: {
                                                    Authorization: "Bearer ".concat(this.tokenR99)
                                                }
                                            })];
                                    case 5:
                                        resScenario_2 = _g.sent();
                                        if (!(resScenario_2.status === 201)) return [3 /*break*/, 24];
                                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ id: { $in: zoneVehicles.map(function (v) { return v.id; }) } }, { $set: { availability: "busy" } })];
                                    case 6:
                                        _g.sent();
                                        _g.label = 7;
                                    case 7:
                                        _g.trys.push([7, 17, 18, 23]);
                                        _a = true, _b = __asyncValues(this.pendingOrders[findedIndex].orders);
                                        _g.label = 8;
                                    case 8: return [4 /*yield*/, _b.next()];
                                    case 9:
                                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 16];
                                        _f = _c.value;
                                        _a = false;
                                        _g.label = 10;
                                    case 10:
                                        _g.trys.push([10, , 14, 15]);
                                        myOrder = _f;
                                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/order", {
                                                scenario_id: resScenario_2.data.scenario.id,
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
                                                items: myOrder.products.map(function (product) {
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
                                                    Authorization: "Bearer ".concat(this.tokenR99)
                                                }
                                            })];
                                    case 11:
                                        resOrder = _g.sent();
                                        if (!(resOrder.status === 201)) return [3 /*break*/, 13];
                                        myOrder.scenario_id = resScenario_2.data.scenario.id;
                                        myOrder.ruta99_id = resOrder.data.order.id;
                                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ id: myOrder.id }, { $set: { ruta99_id: myOrder.ruta99_id, scenario_id: myOrder.scenario_id } })];
                                    case 12:
                                        _g.sent();
                                        _g.label = 13;
                                    case 13: return [3 /*break*/, 15];
                                    case 14:
                                        _a = true;
                                        return [7 /*endfinally*/];
                                    case 15: return [3 /*break*/, 8];
                                    case 16: return [3 /*break*/, 23];
                                    case 17:
                                        e_3_1 = _g.sent();
                                        e_3 = { error: e_3_1 };
                                        return [3 /*break*/, 23];
                                    case 18:
                                        _g.trys.push([18, , 21, 22]);
                                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 20];
                                        return [4 /*yield*/, _e.call(_b)];
                                    case 19:
                                        _g.sent();
                                        _g.label = 20;
                                    case 20: return [3 /*break*/, 22];
                                    case 21:
                                        if (e_3) throw e_3.error;
                                        return [7 /*endfinally*/];
                                    case 22: return [7 /*endfinally*/];
                                    case 23:
                                        // console.log(this.pendingOrders);
                                        this.pendingOrders[findedIndex].orders = [];
                                        axios_1.default.post("https://api.ruta99.co/v1/scenario/".concat(resScenario_2.data.scenario.id, "/optimize"), {}, {
                                            headers: {
                                                Authorization: "Bearer ".concat(this.tokenR99)
                                            }
                                        }).then(function (res) {
                                            console.log(res.data.message);
                                            var secondInterval;
                                            secondInterval = setInterval(function () {
                                                axios_1.default.get("https://api.ruta99.co/v1/scenario/".concat(resScenario_2.data.scenario.id, "/fetch-best-solution"), {
                                                    headers: {
                                                        Authorization: "Bearer ".concat(_this.tokenR99)
                                                    }
                                                }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(data.data.status === 'solved')) return [3 /*break*/, 2];
                                                                clearInterval(secondInterval);
                                                                return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ id: { $in: zoneVehicles.map(function (v) { return v.id; }) } }, { $set: { availability: "busy" } })];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2: return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }, 10000);
                                        });
                                        _g.label = 24;
                                    case 24: return [2 /*return*/];
                                }
                            });
                        }); }, 5000);
                        return [4 /*yield*/, order_schema_1.OrderModel.create(order)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    MongoRepository.prototype.updateOrder = function (id, order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.findOneAndUpdate({ id: id }, order, {
                            new: true,
                        })];
                    case 1:
                        orderUpdated = _a.sent();
                        return [2 /*return*/, orderUpdated];
                }
            });
        });
    };
    MongoRepository.prototype.allOrder = function (seller_id) {
        var _a, e_4, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var orders, _d, orders_1, orders_1_1, order, _e, e_4_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.find({ seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 1:
                        orders = _f.sent();
                        orders = JSON.parse(JSON.stringify(orders));
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 10, 11, 16]);
                        _d = true, orders_1 = __asyncValues(orders);
                        _f.label = 3;
                    case 3: return [4 /*yield*/, orders_1.next()];
                    case 4:
                        if (!(orders_1_1 = _f.sent(), _a = orders_1_1.done, !_a)) return [3 /*break*/, 9];
                        _c = orders_1_1.value;
                        _d = false;
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, , 7, 8]);
                        order = _c;
                        _e = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status }, { name: 1 })];
                    case 6:
                        _e.guide_status = (_f.sent()).name;
                        order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
                        return [3 /*break*/, 8];
                    case 7:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_4_1 = _f.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _f.trys.push([11, , 14, 15]);
                        if (!(!_d && !_a && (_b = orders_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(orders_1)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.getOrdersPage = function (seller_id, pag) {
        var _a, e_5, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, orders, _d, _e, _f, order, _g, e_5_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        options = {
                            page: pag,
                            limit: 6,
                            sort: { createdAt: -1 }
                        };
                        return [4 /*yield*/, order_schema_1.OrderModel.paginate({ seller_id: new mongoose_1.default.Types.ObjectId(seller_id) }, options)];
                    case 1:
                        orders = _h.sent();
                        orders = JSON.parse(JSON.stringify(orders));
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 10, 11, 16]);
                        _d = true, _e = __asyncValues(orders.docs);
                        _h.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _h.sent(), _a = _f.done, !_a)) return [3 /*break*/, 9];
                        _c = _f.value;
                        _d = false;
                        _h.label = 5;
                    case 5:
                        _h.trys.push([5, , 7, 8]);
                        order = _c;
                        _g = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status }, { name: 1 })];
                    case 6:
                        _g.guide_status = (_h.sent()).name;
                        order.createdAt = new Date("" + order.createdAt).toISOString().slice(0, 10);
                        return [3 /*break*/, 8];
                    case 7:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_5_1 = _h.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _h.trys.push([11, , 14, 15]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(_e)];
                    case 12:
                        _h.sent();
                        _h.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.findOrderByGuide = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.findOne({ guide: guide })];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    MongoRepository.prototype.insertStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusToInsert, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusToInsert = [
                            { id: 1, name: "En procesamiento" },
                            { id: 2, name: "Guía generada" },
                            { id: 3, name: "Cancelado" },
                            { id: 4, name: "Orden recogida" },
                            { id: 5, name: "En reparto" },
                            { id: 6, name: "Entregado" },
                            { id: 7, name: "Devolución" },
                        ];
                        return [4 /*yield*/, status_schema_1.default.create(statusToInsert)];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    MongoRepository.prototype.updateStatus = function (id, guide_status) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ id: id }, { $set: { guide_status: guide_status } })];
                    case 1:
                        updatedStatus = _a.sent();
                        return [2 /*return*/, updatedStatus];
                }
            });
        });
    };
    MongoRepository.prototype.allOrders = function (pag) {
        var _a, e_6, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, result, orders, _d, _e, _f, order, _g, _h, fechaUtc, e_6_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        options = {
                            page: pag,
                            limit: 7,
                            sort: { createdAt: -1 }
                        };
                        return [4 /*yield*/, order_schema_1.OrderModel.paginate({}, options)];
                    case 1:
                        result = _j.sent();
                        orders = JSON.parse(JSON.stringify(result));
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 11, 12, 17]);
                        _d = true, _e = __asyncValues(orders.docs);
                        _j.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _j.sent(), _a = _f.done, !_a)) return [3 /*break*/, 10];
                        _c = _f.value;
                        _d = false;
                        _j.label = 5;
                    case 5:
                        _j.trys.push([5, , 8, 9]);
                        order = _c;
                        _g = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 6:
                        _g.guide_status = (_j.sent()).name;
                        _h = order;
                        return [4 /*yield*/, seller_schema_1.SellerModel.findOne({ _id: order.seller_id })];
                    case 7:
                        _h.seller = (_j.sent()).name;
                        fechaUtc = new Date("" + order.createdAt);
                        order.equalDates = order.createdAt === order.updatedAt;
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [3 /*break*/, 9];
                    case 8:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 3];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_6_1 = _j.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _j.trys.push([12, , 15, 16]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _b.call(_e)];
                    case 13:
                        _j.sent();
                        _j.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.ordersDate = function (rol, date, seller_id) {
        var _a, e_7, _b, _c, _d, e_8, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var theDate, theYear, theMonth, theDay, ordersDate, _g, ordersDate_1, ordersDate_1_1, order, _h, fechaUtc, e_7_1, ordersDate, myOrders, _j, ordersDate_2, ordersDate_2_1, order, fechaUtc, _k, _l, e_8_1;
            var _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        theDate = date.split('-');
                        theYear = parseInt(theDate[0]);
                        theMonth = parseInt(theDate[1]);
                        theDay = parseInt(theDate[2]);
                        if (!(rol === 'superuser')) return [3 /*break*/, 20];
                        ordersDate = [];
                        if (!Number.isNaN(theDay)) return [3 /*break*/, 2];
                        return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-01")), $lt: new Date("".concat(theYear, "-").concat(theMonth + 1, "-01")) } })];
                    case 1:
                        ordersDate = _o.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) } })];
                    case 3:
                        ordersDate = _o.sent();
                        _o.label = 4;
                    case 4:
                        ordersDate = JSON.parse(JSON.stringify(ordersDate));
                        _o.label = 5;
                    case 5:
                        _o.trys.push([5, 13, 14, 19]);
                        _g = true, ordersDate_1 = __asyncValues(ordersDate);
                        _o.label = 6;
                    case 6: return [4 /*yield*/, ordersDate_1.next()];
                    case 7:
                        if (!(ordersDate_1_1 = _o.sent(), _a = ordersDate_1_1.done, !_a)) return [3 /*break*/, 12];
                        _c = ordersDate_1_1.value;
                        _g = false;
                        _o.label = 8;
                    case 8:
                        _o.trys.push([8, , 10, 11]);
                        order = _c;
                        _h = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 9:
                        _h.guide_status = (_o.sent()).name;
                        fechaUtc = new Date("" + order.createdAt);
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [3 /*break*/, 11];
                    case 10:
                        _g = true;
                        return [7 /*endfinally*/];
                    case 11: return [3 /*break*/, 6];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_7_1 = _o.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _o.trys.push([14, , 17, 18]);
                        if (!(!_g && !_a && (_b = ordersDate_1.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _b.call(ordersDate_1)];
                    case 15:
                        _o.sent();
                        _o.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_7) throw e_7.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, ordersDate];
                    case 20:
                        ordersDate = [];
                        if (!Number.isNaN(theDay)) return [3 /*break*/, 22];
                        return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-01")), $lt: new Date("".concat(theYear, "-").concat(theMonth + 1, "-01")) }, seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 21:
                        ordersDate = _o.sent();
                        return [3 /*break*/, 24];
                    case 22: return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) }, seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 23:
                        ordersDate = _o.sent();
                        _o.label = 24;
                    case 24:
                        myOrders = [];
                        _o.label = 25;
                    case 25:
                        _o.trys.push([25, 33, 34, 39]);
                        _j = true, ordersDate_2 = __asyncValues(ordersDate);
                        _o.label = 26;
                    case 26: return [4 /*yield*/, ordersDate_2.next()];
                    case 27:
                        if (!(ordersDate_2_1 = _o.sent(), _d = ordersDate_2_1.done, !_d)) return [3 /*break*/, 32];
                        _f = ordersDate_2_1.value;
                        _j = false;
                        _o.label = 28;
                    case 28:
                        _o.trys.push([28, , 30, 31]);
                        order = _f;
                        fechaUtc = new Date("" + order.createdAt);
                        _l = (_k = myOrders).push;
                        _m = {
                            client_name: order.client_name,
                            client_surname: order.client_surname,
                            products: order.products,
                            value_to_collect: order.value_to_collect
                        };
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 29:
                        _l.apply(_k, [(_m.guide_status = (_o.sent()).name,
                                _m.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                                _m)]);
                        return [3 /*break*/, 31];
                    case 30:
                        _j = true;
                        return [7 /*endfinally*/];
                    case 31: return [3 /*break*/, 26];
                    case 32: return [3 /*break*/, 39];
                    case 33:
                        e_8_1 = _o.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 39];
                    case 34:
                        _o.trys.push([34, , 37, 38]);
                        if (!(!_j && !_d && (_e = ordersDate_2.return))) return [3 /*break*/, 36];
                        return [4 /*yield*/, _e.call(ordersDate_2)];
                    case 35:
                        _o.sent();
                        _o.label = 36;
                    case 36: return [3 /*break*/, 38];
                    case 37:
                        if (e_8) throw e_8.error;
                        return [7 /*endfinally*/];
                    case 38: return [7 /*endfinally*/];
                    case 39: return [2 /*return*/, myOrders];
                }
            });
        });
    };
    MongoRepository.prototype.authR99 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (error) {
                }
                return [2 /*return*/, 200];
            });
        });
    };
    MongoRepository.prototype.createScenario = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gmt5Now, vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gmt5Now = new Date(new Date().getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [4 /*yield*/, axios_1.default.get("https://api.ruta99.co/v1/vehicle", {
                                headers: {
                                    Authorization: "Bearer ".concat(this.tokenR99)
                                }
                            })];
                    case 1:
                        vehicles = _a.sent();
                        return [2 /*return*/, vehicles.data.data];
                }
            });
        });
    };
    MongoRepository.prototype.orderReports = function (start, ending, seller_id, rol) {
        var _a, e_9, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var ordersDate, ordersDateWithNames, _d, ordersDate_3, ordersDate_3_1, order, _e, _f, _g, e_9_1;
            var _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        ordersDate = [];
                        if (!(rol === 'superuser')) return [3 /*break*/, 2];
                        return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(start)), $lt: new Date("".concat(ending)) } }, {
                                guide: 1, depot_name: 1, client_name: 1, client_surname: 1, client_address: 1, client_address_detail: 1, client_city: 1, client_state: 1, client_telephone: 1,
                                guide_status: 1, products: 1, value_to_collect: 1, createdAt: 1
                            })
                            // ordersDate = await OrderModel.find({ createdAt: { $gt: new Date(`${start}`), $lt: new Date(`${ending}`) } });
                        ];
                    case 1:
                        ordersDate = _j.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(start)), $lt: new Date("".concat(ending)) }, seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 3:
                        ordersDate = _j.sent();
                        _j.label = 4;
                    case 4:
                        ordersDateWithNames = [];
                        _j.label = 5;
                    case 5:
                        _j.trys.push([5, 13, 14, 19]);
                        _d = true, ordersDate_3 = __asyncValues(ordersDate);
                        _j.label = 6;
                    case 6: return [4 /*yield*/, ordersDate_3.next()];
                    case 7:
                        if (!(ordersDate_3_1 = _j.sent(), _a = ordersDate_3_1.done, !_a)) return [3 /*break*/, 12];
                        _c = ordersDate_3_1.value;
                        _d = false;
                        _j.label = 8;
                    case 8:
                        _j.trys.push([8, , 10, 11]);
                        order = _c;
                        _f = (_e = ordersDateWithNames).push;
                        _h = {
                            Fecha: new Date(new Date("" + order.createdAt).getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10),
                            Guia: order.guide,
                            Bodega: order.depot_name,
                            'Nombre cliente': order.client_name,
                            'Apellido cliente': order.client_surname,
                            'Dirección': order.client_address,
                            Detalle: order.client_address_detail,
                            Ciudad: order.client_city,
                            Departamento: order.client_state,
                            'Teléfono': order.client_telephone
                        };
                        _g = 'Estado de orden';
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status }, { name: 1 })];
                    case 9:
                        _f.apply(_e, [(_h[_g] = (_j.sent()).name,
                                _h.Productos = order.products.map(function (p) { return p.name; }).join(', '),
                                _h.Cantidad = order.products.map(function (p) { return p.quantity; }).join(', '),
                                _h['Valor a recoger'] = order.value_to_collect,
                                _h)]);
                        return [3 /*break*/, 11];
                    case 10:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 11: return [3 /*break*/, 6];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_9_1 = _j.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _j.trys.push([14, , 17, 18]);
                        if (!(!_d && !_a && (_b = ordersDate_3.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _b.call(ordersDate_3)];
                    case 15:
                        _j.sent();
                        _j.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_9) throw e_9.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, ordersDateWithNames];
                }
            });
        });
    };
    MongoRepository.prototype.recentOrders = function (rol, seller_id) {
        var _a, e_10, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, recentOrders, _d, _e, _f, order, _g, e_10_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        options = {
                            page: 1,
                            limit: 10,
                            // sort: { createdAt: -1 },
                            select: { client_name: 1, client_surname: 1, products: 1, value_to_collect: 1, guide_status: 1 }
                        };
                        recentOrders = [];
                        if (!(rol === 'superuser')) return [3 /*break*/, 2];
                        return [4 /*yield*/, order_schema_1.OrderModel.paginate({ guide_status: "6" }, { options: options })];
                    case 1:
                        recentOrders = _h.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, order_schema_1.OrderModel.paginate({ guide_status: "6", seller_id: new mongoose_1.default.Types.ObjectId(seller_id) }, { options: options })];
                    case 3:
                        recentOrders = _h.sent();
                        _h.label = 4;
                    case 4:
                        _h.trys.push([4, 12, 13, 18]);
                        _d = true, _e = __asyncValues(recentOrders.docs);
                        _h.label = 5;
                    case 5: return [4 /*yield*/, _e.next()];
                    case 6:
                        if (!(_f = _h.sent(), _a = _f.done, !_a)) return [3 /*break*/, 11];
                        _c = _f.value;
                        _d = false;
                        _h.label = 7;
                    case 7:
                        _h.trys.push([7, , 9, 10]);
                        order = _c;
                        _g = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 8:
                        _g.guide_status = (_h.sent()).name;
                        return [3 /*break*/, 10];
                    case 9:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 10: return [3 /*break*/, 5];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_10_1 = _h.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _h.trys.push([13, , 16, 17]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _b.call(_e)];
                    case 14:
                        _h.sent();
                        _h.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_10) throw e_10.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [2 /*return*/, recentOrders];
                }
            });
        });
    };
    MongoRepository.prototype.orderTraceability = function (code, status) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, currentTimestamp, token, myOrder, resScenario, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!!this.tokenR99) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 1:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        return [3 /*break*/, 4];
                    case 2:
                        decoded = jsonwebtoken_1.default.decode(this.tokenR99);
                        if (!decoded || !decoded.exp) {
                            return [2 /*return*/, true]; // El token no es válido o no tiene fecha de expiración
                        }
                        currentTimestamp = Math.floor(Date.now() / 1000);
                        if (!(decoded.exp < currentTimestamp)) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 3:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, order_schema_1.OrderModel.findOne({ guide: code }, { scenario_id: 1 })];
                    case 5:
                        myOrder = _a.sent();
                        resScenario = axios_1.default.get("https://api.ruta99.co/v1/scenario/".concat(myOrder.scenario_id), {
                            headers: {
                                Authorization: "Bearer ".concat(this.tokenR99)
                            }
                        });
                        resScenario.then(function (_a) {
                            var data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(data.data.status === 'approved')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map(function (v) { return v.id; }) } }, { $set: { availability: "busy" } })];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            if (!(data.data.status === 'completed')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateMany({ ruta99_id: { $in: data.data.vehicles.map(function (v) { return v.id; }) } }, { $set: { availability: "available" } })];
                                        case 3:
                                            _b.sent();
                                            _b.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2.response);
                        return [3 /*break*/, 7];
                    case 7:
                        if (!(status === "loaded")) return [3 /*break*/, 9];
                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ guide: code }, { $set: { guide_status: "4" } })];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9:
                        if (!(status === "onroute")) return [3 /*break*/, 11];
                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ guide: code }, { $set: { guide_status: "5" } })];
                    case 10: return [2 /*return*/, _a.sent()];
                    case 11:
                        if (!(status === "completed")) return [3 /*break*/, 13];
                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ guide: code }, { $set: { guide_status: "6" } })];
                    case 12: return [2 /*return*/, _a.sent()];
                    case 13:
                        if (!(status === "fail")) return [3 /*break*/, 15];
                        return [4 /*yield*/, order_schema_1.OrderModel.updateOne({ guide: code }, { $set: { guide_status: "7" } })];
                    case 14: return [2 /*return*/, _a.sent()];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
