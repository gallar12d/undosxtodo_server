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
var orderOut_value_1 = require("../../domain/orderOut.value");
var SECRET_KEY = "".concat(process.env.SECRET_KEY || "secret@123");
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        var _this = this;
        this.orderService = orderService;
        this.registerOrder = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var carrierId, orderOutsourcingValue, _b, _c, err_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            body.orderItem = JSON.parse(body.orderItem);
                            carrierId = body.carrierId;
                            delete body.carrierId;
                            orderOutsourcingValue = new orderOut_value_1.OrderValue(body);
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.registerOrder(orderOutsourcingValue, carrierId)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _d.sent();
                            err_1.message = err_1.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getOrdersPage = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var seller_id, pag, _b, _c, err_2;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            seller_id = body.seller_id, pag = body.pag;
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.getOrdersPage(seller_id, pag)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _d.sent();
                            err_2.message = err_2.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_2));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getOrderOutDate = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c, err_3;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.getOrderOutDate(body)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _d.sent();
                            err_3.message = err_3.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_3));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.recentOutOrders = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c, err_4;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.recentOutOrders(body)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _d.sent();
                            console.log(err_4);
                            // err.message = err.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_4));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.allOutOrders = function (_a, res) {
            var params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c, err_5;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.allOutOrders(params.pag)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _d.sent();
                            err_5.message = err_5.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_5));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.setOrderStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, err_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        // const { token } = req.headers;
                        // if (!token) {
                        //   throw new Error("Please authenticate");
                        // }
                        // const decoded = jwt.verify(token, SECRET_KEY);
                        // console.log('Token verificado: ' + decoded);
                        _b = (_a = res).json;
                        return [4 /*yield*/, this.orderService.setOrderStatus(req.body)];
                    case 1:
                        // const { token } = req.headers;
                        // if (!token) {
                        //   throw new Error("Please authenticate");
                        // }
                        // const decoded = jwt.verify(token, SECRET_KEY);
                        // console.log('Token verificado: ' + decoded);
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _c.sent();
                        res.status(400).json((0, handleErrors_1.default)(err_6));
                        console.log('Error al verificar el token');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getOrderOutsourcing = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var _b, _c, err_7;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            _c = (_b = res).json;
                            return [4 /*yield*/, this.orderService.getOrderOutsourcing(body)];
                        case 1:
                            _c.apply(_b, [_d.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            err_7 = _d.sent();
                            err_7.message = err_7.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_7));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getOutDrivers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, err_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = res).json;
                        return [4 /*yield*/, this.orderService.getOutDrivers(req.body.seller_id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _c.sent();
                        err_8.message = err_8.response.data.errors;
                        res.status(400).json((0, handleErrors_1.default)(err_8));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return OrderController;
}());
exports.OrderController = OrderController;
