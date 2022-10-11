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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
var order_value_1 = require("../domain/order.value");
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository) {
        this.orderRepository = orderRepository;
    }
    OrderService.prototype.registerOrder = function (_a) {
        var winery_name = _a.winery_name, guide = _a.guide, guide_status = _a.guide_status, seller_address = _a.seller_address, seller_city = _a.seller_city, seller_state = _a.seller_state, seller_telephone = _a.seller_telephone, seller_nit = _a.seller_nit, seller_postal_code = _a.seller_postal_code, seller_country = _a.seller_country, seller_email = _a.seller_email, client_name = _a.client_name, client_surname = _a.client_surname, client_address = _a.client_address, client_city = _a.client_city, client_state = _a.client_state, client_telephone = _a.client_telephone, products = _a.products, client_country = _a.client_country, value_to_collect = _a.value_to_collect;
        return __awaiter(this, void 0, void 0, function () {
            var orderValue, exist, orderCreated, order_response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderValue = new order_value_1.OrderValue({
                            winery_name: winery_name,
                            guide: guide,
                            guide_status: guide_status,
                            seller_address: seller_address,
                            seller_city: seller_city,
                            seller_state: seller_state,
                            seller_telephone: seller_telephone,
                            seller_nit: seller_nit,
                            seller_postal_code: seller_postal_code,
                            seller_country: seller_country,
                            seller_email: seller_email,
                            client_name: client_name,
                            client_surname: client_surname,
                            client_address: client_address,
                            client_city: client_city,
                            client_state: client_state,
                            client_telephone: client_telephone,
                            products: products,
                            client_country: client_country,
                            value_to_collect: value_to_collect,
                        });
                        return [4 /*yield*/, this.orderExist(guide)];
                    case 1:
                        exist = _b.sent();
                        if (exist)
                            throw new Error("Order guide already exist");
                        return [4 /*yield*/, this.orderRepository.registerOrder(orderValue)];
                    case 2:
                        orderCreated = _b.sent();
                        order_response = {
                            id: orderCreated.id,
                        };
                        return [2 /*return*/, order_response];
                }
            });
        });
    };
    OrderService.prototype.findOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOrder(id)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrderService.prototype.orderExist = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!guide) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.orderRepository.findOrderByGuide(guide)];
                    case 1:
                        order = _a.sent();
                        if (order)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    OrderService.prototype.allOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.allOrder()];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
