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
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
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
    MongoRepository.prototype.registerOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_schema_1.OrderModel.create(order)];
                    case 1:
                        orderCreated = _a.sent();
                        return [2 /*return*/, orderCreated];
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
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var orders, _d, orders_1, orders_1_1, order, _e, e_1_1;
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
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.getOrdersPage = function (seller_id, pag) {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, orders, _d, _e, _f, order, _g, e_2_1;
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
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
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
                        if (e_2) throw e_2.error;
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
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, result, orders, _d, _e, _f, order, _g, _h, fechaUtc, e_3_1;
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
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [3 /*break*/, 9];
                    case 8:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 3];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_3_1 = _j.sent();
                        e_3 = { error: e_3_1 };
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
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, orders];
                }
            });
        });
    };
    MongoRepository.prototype.ordersDate = function (rol, date, seller_id) {
        var _a, e_4, _b, _c, _d, e_5, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var theDate, theYear, theMonth, theDay, ordersDate, _g, ordersDate_1, ordersDate_1_1, order, _h, fechaUtc, e_4_1, ordersDate, _j, ordersDate_2, ordersDate_2_1, order, _k, fechaUtc, e_5_1;
            return __generator(this, function (_l) {
                switch (_l.label) {
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
                        ordersDate = _l.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) } })];
                    case 3:
                        ordersDate = _l.sent();
                        _l.label = 4;
                    case 4:
                        ordersDate = JSON.parse(JSON.stringify(ordersDate));
                        _l.label = 5;
                    case 5:
                        _l.trys.push([5, 13, 14, 19]);
                        _g = true, ordersDate_1 = __asyncValues(ordersDate);
                        _l.label = 6;
                    case 6: return [4 /*yield*/, ordersDate_1.next()];
                    case 7:
                        if (!(ordersDate_1_1 = _l.sent(), _a = ordersDate_1_1.done, !_a)) return [3 /*break*/, 12];
                        _c = ordersDate_1_1.value;
                        _g = false;
                        _l.label = 8;
                    case 8:
                        _l.trys.push([8, , 10, 11]);
                        order = _c;
                        _h = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 9:
                        _h.guide_status = (_l.sent()).name;
                        fechaUtc = new Date("" + order.createdAt);
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [3 /*break*/, 11];
                    case 10:
                        _g = true;
                        return [7 /*endfinally*/];
                    case 11: return [3 /*break*/, 6];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_4_1 = _l.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _l.trys.push([14, , 17, 18]);
                        if (!(!_g && !_a && (_b = ordersDate_1.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _b.call(ordersDate_1)];
                    case 15:
                        _l.sent();
                        _l.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/, ordersDate];
                    case 20:
                        ordersDate = [];
                        if (!Number.isNaN(theDay)) return [3 /*break*/, 22];
                        return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-01")), $lt: new Date("".concat(theYear, "-").concat(theMonth + 1, "-01")) }, seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 21:
                        ordersDate = _l.sent();
                        return [3 /*break*/, 24];
                    case 22: return [4 /*yield*/, order_schema_1.OrderModel.find({ createdAt: { $gt: new Date("".concat(theYear, "-").concat(theMonth, "-").concat(theDay)) }, seller_id: new mongoose_1.default.Types.ObjectId(seller_id) })];
                    case 23:
                        ordersDate = _l.sent();
                        _l.label = 24;
                    case 24:
                        _l.trys.push([24, 32, 33, 38]);
                        _j = true, ordersDate_2 = __asyncValues(ordersDate);
                        _l.label = 25;
                    case 25: return [4 /*yield*/, ordersDate_2.next()];
                    case 26:
                        if (!(ordersDate_2_1 = _l.sent(), _d = ordersDate_2_1.done, !_d)) return [3 /*break*/, 31];
                        _f = ordersDate_2_1.value;
                        _j = false;
                        _l.label = 27;
                    case 27:
                        _l.trys.push([27, , 29, 30]);
                        order = _f;
                        _k = order;
                        return [4 /*yield*/, status_schema_1.default.findOne({ id: order.guide_status })];
                    case 28:
                        _k.guide_status = (_l.sent()).name;
                        fechaUtc = new Date("" + order.createdAt);
                        order.createdAt = new Date(fechaUtc.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 10);
                        return [3 /*break*/, 30];
                    case 29:
                        _j = true;
                        return [7 /*endfinally*/];
                    case 30: return [3 /*break*/, 25];
                    case 31: return [3 /*break*/, 38];
                    case 32:
                        e_5_1 = _l.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 38];
                    case 33:
                        _l.trys.push([33, , 36, 37]);
                        if (!(!_j && !_d && (_e = ordersDate_2.return))) return [3 /*break*/, 35];
                        return [4 /*yield*/, _e.call(ordersDate_2)];
                    case 34:
                        _l.sent();
                        _l.label = 35;
                    case 35: return [3 /*break*/, 37];
                    case 36:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 37: return [7 /*endfinally*/];
                    case 38: return [2 /*return*/, ordersDate];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
