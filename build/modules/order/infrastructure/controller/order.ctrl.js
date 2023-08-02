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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
var handleErrors_1 = __importDefault(require("../../../../infrastructure/utils/handleErrors"));
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        var _this = this;
        this.orderService = orderService;
        this.findOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.findOrderByGuide(req.params.id)];
                    case 1:
                        order = _a.sent();
                        res.status(200).send(order);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(400).send((0, handleErrors_1.default)(err_1));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getOrdersPage = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var seller_id, pag, orders, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            seller_id = body.seller_id, pag = body.pag;
                            return [4 /*yield*/, this.orderService.getOrdersPage(seller_id, pag)];
                        case 1:
                            orders = _b.sent();
                            res.status(200).send(orders);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _b.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_2));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.allOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order, err_3, orders, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.query.guide) return [3 /*break*/, 5];
                        console.log(req.query.guide);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.orderService.findOrderByGuide(req.query.guide)];
                    case 2:
                        order = _a.sent();
                        res.status(200).send(order);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        res.status(400).send((0, handleErrors_1.default)(err_3));
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.orderService.allOrder(req.query.seller_id)];
                    case 6:
                        orders = _a.sent();
                        res.send(orders);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        res.status(401).send((0, handleErrors_1.default)(error_1));
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.registerOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.registerOrder(req.body)];
                    case 1:
                        order = _a.sent();
                        res.json(order);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(400).json((0, handleErrors_1.default)(err_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSettings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var limitHour, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.getSettings()];
                    case 1:
                        limitHour = _a.sent();
                        res.json(limitHour);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(400).json((0, handleErrors_1.default)(err_5));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.setSettings = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes, _b, _c, err_6;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            limitHour = body.limitHour, limitMinutes = body.limitMinutes, maxAmountPerZone = body.maxAmountPerZone, ordersLimitPerZone = body.ordersLimitPerZone, zoneTime = body.zoneTime, limitShipments = body.limitShipments, openingHour = body.openingHour, openingMinutes = body.openingMinutes;
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.setSettings(limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_6 = _d.sent();
                            res.status(400).json((0, handleErrors_1.default)(err_6));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.updateOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.updateOrder(req.params.id, req.body)];
                    case 1:
                        order = _a.sent();
                        res.send(order);
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        res.status(400).send((0, handleErrors_1.default)(err_7));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.insertStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var newStatus, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.insertStatus()];
                    case 1:
                        newStatus = _a.sent();
                        res.send(newStatus);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        res.status(400).send((0, handleErrors_1.default)(err_8));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateStatus = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var id, guide_status, updatedStatus, err_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            id = body.id, guide_status = body.guide_status;
                            return [4 /*yield*/, this.orderService.updateStatus(id, guide_status)];
                        case 1:
                            updatedStatus = _b.sent();
                            res.status(200).send(updatedStatus);
                            return [3 /*break*/, 3];
                        case 2:
                            err_9 = _b.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_9));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.allOrders = function (_a, res) {
            var params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var pag, orders, err_10;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            pag = params.pag;
                            return [4 /*yield*/, this.orderService.allOrders(pag)];
                        case 1:
                            orders = _b.sent();
                            res.status(200).send(orders);
                            return [3 /*break*/, 3];
                        case 2:
                            err_10 = _b.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_10));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.ordersDate = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var rol, date, seller_id, ordersDate, ordersDate, err_11;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            rol = body.rol, date = body.date, seller_id = body.seller_id;
                            if (!(rol === 'superuser')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.orderService.ordersDate(rol, date, '')];
                        case 1:
                            ordersDate = _b.sent();
                            res.status(200).send(ordersDate);
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(rol === 'admin')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.orderService.ordersDate(rol, date, seller_id)];
                        case 3:
                            ordersDate = _b.sent();
                            res.status(200).send(ordersDate);
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_11 = _b.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_11));
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        this.deleteScenario = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // res.json(await this.orderService);
                    res.json({ m: "Eliminando escenario" });
                }
                catch (err) {
                    res.status(400).send((0, handleErrors_1.default)(err));
                }
                return [2 /*return*/];
            });
        }); };
        this.orderReports = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var start, ending, seller_id, rol, _b, _c, err_12;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            start = body.start, ending = body.ending, seller_id = body.seller_id, rol = body.rol;
                            _c = (_b = res).send;
                            return [4 /*yield*/, this.orderService.orderReports(start, ending, seller_id, rol)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_12 = _d.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_12));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.recentOrders = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var rol, seller_id, _b, _c, err_13;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            rol = body.rol, seller_id = body.seller_id;
                            _c = (_b = res).send;
                            return [4 /*yield*/, this.orderService.recentOrders(rol, seller_id)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_13 = _d.sent();
                            res.status(400).send((0, handleErrors_1.default)(err_13));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.orderTraceability = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var code, status, _b, _c, err_14;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            code = body.code, status = body.status;
                            _c = (_b = res.status(200)).json;
                            return [4 /*yield*/, this.orderService.orderTraceability(code, status)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_14 = _d.sent();
                            res.status(400).json((0, handleErrors_1.default)(err_14));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return OrderController;
}());
exports.OrderController = OrderController;
