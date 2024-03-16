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
var orderOut_schema_1 = require("../model/orderOut.schema");
// import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
// import axios from 'axios';
// import jwt from "jsonwebtoken";
// import { VehicleModel } from "../../../vehicle/infrastructure/model/vehicle.schema";
// import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
// import schedule from "node-schedule";
// import { DateTime } from 'luxon';
var integration_1 = __importDefault(require("shipday/integration"));
var order_info_request_1 = __importDefault(require("shipday/integration/order/request/order.info.request"));
var order_item_1 = __importDefault(require("shipday/integration/order/request/order.item"));
var dealer_schema_1 = require("../../../dealer/infrastructure/model/dealer.schema");
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.shipdayClient = new integration_1.default('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
    }
    MongoRepository.prototype.registerOrder = function (order, carrierId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, orderInfoRequest, itemsArr_1, res2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        res = void 0;
                        orderInfoRequest = new order_info_request_1.default(order.orderNumber, order.customerName, order.customerAddress, order.customerEmail, order.customerPhoneNumber, order.sellerName, order.depotAddress);
                        if (!!order.depotPhoneNumber)
                            orderInfoRequest.setRestaurantPhoneNumber(order.depotPhoneNumber);
                        orderInfoRequest.setTotalOrderCost(order.totalOrderCost);
                        itemsArr_1 = [];
                        order.orderItem.forEach(function (item) {
                            itemsArr_1.push(new order_item_1.default(item.name, parseInt(item.subtotal), parseInt(item.quantity)));
                        });
                        orderInfoRequest.setOrderItems(itemsArr_1);
                        return [4 /*yield*/, this.shipdayClient.orderService.insertOrder(orderInfoRequest)];
                    case 1:
                        res2 = _a.sent();
                        if (!(res2.success === true)) return [3 /*break*/, 3];
                        this.shipdayClient.orderService.assignOrder(res2.orderId, carrierId);
                        order.orderId = res2.orderId;
                        console.log('Se creó la orden: ', order);
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.create(order)];
                    case 2:
                        res = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, res];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.getOrdersPage = function (seller_id, pag) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, orders, _d, _e, _f, order, e_1_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        options = {
                            page: pag,
                            limit: 6,
                            sort: { createdAt: -1 }
                        };
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.paginate({ sellerId: new mongoose_1.default.Types.ObjectId(seller_id) }, options)];
                    case 1:
                        orders = _g.sent();
                        orders = JSON.parse(JSON.stringify(orders));
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 7, 8, 13]);
                        _d = true, _e = __asyncValues(orders.docs);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 6];
                        _c = _f.value;
                        _d = false;
                        try {
                            order = _c;
                            order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
                        }
                        finally {
                            _d = true;
                        }
                        _g.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _b.call(_e)];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.getOrderOutDate = function (body) {
        var _a, e_2, _b, _c, _d, e_3, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var theDate, theYear, theMonth, theDay, ordersDate_3, _g, ordersDate_1, ordersDate_1_1, order, e_2_1, ordersDate, _h, ordersDate_2, ordersDate_2_1, order, e_3_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        theDate = body.date.split('-');
                        theYear = parseInt(theDate[0]);
                        theMonth = parseInt(theDate[1]);
                        theDay = parseInt(theDate[2]);
                        if (!(body.rol === 'superuser')) return [3 /*break*/, 17];
                        ordersDate_3 = [];
                        if (!Number.isNaN(theDay)) return [3 /*break*/, 2];
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-01")), $lt: new Date("".concat(theYear, "-").concat(theMonth + 1, "-01")) } })];
                    case 1:
                        ordersDate_3 = _j.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) } })];
                    case 3:
                        ordersDate_3 = _j.sent();
                        _j.label = 4;
                    case 4:
                        ordersDate_3 = JSON.parse(JSON.stringify(ordersDate_3));
                        _j.label = 5;
                    case 5:
                        _j.trys.push([5, 10, 11, 16]);
                        _g = true, ordersDate_1 = __asyncValues(ordersDate_3);
                        _j.label = 6;
                    case 6: return [4 /*yield*/, ordersDate_1.next()];
                    case 7:
                        if (!(ordersDate_1_1 = _j.sent(), _a = ordersDate_1_1.done, !_a)) return [3 /*break*/, 9];
                        _c = ordersDate_1_1.value;
                        _g = false;
                        try {
                            order = _c;
                            order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
                        }
                        finally {
                            _g = true;
                        }
                        _j.label = 8;
                    case 8: return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _j.trys.push([11, , 14, 15]);
                        if (!(!_g && !_a && (_b = ordersDate_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(ordersDate_1)];
                    case 12:
                        _j.sent();
                        _j.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, ordersDate_3];
                    case 17:
                        ordersDate = [];
                        if (!Number.isNaN(theDay)) return [3 /*break*/, 19];
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-01")), $lt: new Date("".concat(theYear, "-").concat(theMonth + 1, "-01")) }, sellerId: new mongoose_1.default.Types.ObjectId(body.seller_id) })];
                    case 18:
                        ordersDate = _j.sent();
                        return [3 /*break*/, 21];
                    case 19: return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) }, sellerId: new mongoose_1.default.Types.ObjectId(body.seller_id) })];
                    case 20:
                        ordersDate = _j.sent();
                        _j.label = 21;
                    case 21:
                        ordersDate = JSON.parse(JSON.stringify(ordersDate));
                        _j.label = 22;
                    case 22:
                        _j.trys.push([22, 27, 28, 33]);
                        _h = true, ordersDate_2 = __asyncValues(ordersDate);
                        _j.label = 23;
                    case 23: return [4 /*yield*/, ordersDate_2.next()];
                    case 24:
                        if (!(ordersDate_2_1 = _j.sent(), _d = ordersDate_2_1.done, !_d)) return [3 /*break*/, 26];
                        _f = ordersDate_2_1.value;
                        _h = false;
                        try {
                            order = _f;
                            order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
                        }
                        finally {
                            _h = true;
                        }
                        _j.label = 25;
                    case 25: return [3 /*break*/, 23];
                    case 26: return [3 /*break*/, 33];
                    case 27:
                        e_3_1 = _j.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 33];
                    case 28:
                        _j.trys.push([28, , 31, 32]);
                        if (!(!_h && !_d && (_e = ordersDate_2.return))) return [3 /*break*/, 30];
                        return [4 /*yield*/, _e.call(ordersDate_2)];
                    case 29:
                        _j.sent();
                        _j.label = 30;
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 32: return [7 /*endfinally*/];
                    case 33: return [2 /*return*/, ordersDate];
                }
            });
        });
    };
    MongoRepository.prototype.recentOutOrders = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var options, theDate, theYear, theMonth, theDay, recentOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            page: 1,
                            limit: 10,
                            sort: { createdAt: -1 },
                        };
                        theDate = body.date.split('-');
                        theYear = parseInt(theDate[0]);
                        theMonth = parseInt(theDate[1]);
                        theDay = parseInt(theDate[2]);
                        recentOrders = [];
                        if (!(body.rol === 'superuser')) return [3 /*break*/, 2];
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.paginate({
                                $and: [
                                    { guide_status: "6" },
                                    { createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) } }
                                ]
                            }, { options: options })];
                    case 1:
                        recentOrders = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.paginate({
                            $and: [
                                { guide_status: "6" },
                                { seller_id: new mongoose_1.default.Types.ObjectId(body.seller_id) },
                                { createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) } }
                            ]
                        }, { options: options })];
                    case 3:
                        recentOrders = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, recentOrders];
                }
            });
        });
    };
    MongoRepository.prototype.setOrderStatus = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // El token brindado a Shipday para el cambio de estado caduca dentro de 10 años y fue creado en el 2023
                        console.log('Se va a actualizar la orden: ' + event.order.id + ' a ' + event.order_status);
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.updateOne({ orderId: event.order.id }, { $set: { orderState: event.order_status } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoRepository.prototype.allOutOrders = function (pag) {
        var _a, e_4, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, result, orders, _d, _e, _f, order, e_4_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        options = {
                            page: pag,
                            limit: 7,
                            sort: { createdAt: -1 }
                        };
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.paginate({}, options)];
                    case 1:
                        result = _g.sent();
                        orders = JSON.parse(JSON.stringify(result));
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 7, 8, 13]);
                        _d = true, _e = __asyncValues(orders.docs);
                        _g.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 6];
                        _c = _f.value;
                        _d = false;
                        try {
                            order = _c;
                            order.seller = order.sellerName;
                            order.equalDates = order.createdAt === order.updatedAt;
                            order.createdAt = new Date(order.createdAt).toISOString().slice(0, 10);
                        }
                        finally {
                            _d = true;
                        }
                        _g.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _b.call(_e)];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.getOrderOutsourcing = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var myOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shipdayClient.orderService.getOrderDetails(order.orderNumber)];
                    case 1:
                        myOrder = _a.sent();
                        return [2 /*return*/, myOrder];
                }
            });
        });
    };
    MongoRepository.prototype.getOutDrivers = function (seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            var carriers, myDealers, filteredDealers, i, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shipdayClient.carrierService.getCarriers()];
                    case 1:
                        carriers = _a.sent();
                        return [4 /*yield*/, dealer_schema_1.DealerModel.find({ $and: [{ seller_id: seller_id }, { status: "active" }] })];
                    case 2:
                        myDealers = _a.sent();
                        filteredDealers = [];
                        for (i = 0; i < myDealers.length; i++) {
                            for (k = 0; k < carriers.length; k++) {
                                if (myDealers[i].shipday_id === carriers[k].id) {
                                    filteredDealers.push(carriers[k]);
                                }
                            }
                        }
                        return [2 /*return*/, filteredDealers];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
