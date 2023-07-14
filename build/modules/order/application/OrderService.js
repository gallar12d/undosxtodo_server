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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
var order_value_1 = require("../domain/order.value");
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository) {
        this.orderRepository = orderRepository;
        this.filterOrder = function (order) {
            var order_filtered = {
                id: order.id,
                depot_name: order.depot_name,
                depot_id: order.depot_id,
                guide: order.guide,
                guide_status: order.guide_status,
                seller_address: order.seller_address,
                seller_city: order.seller_city,
                seller_state: order.seller_state,
                seller_telephone: order.seller_telephone,
                seller_nit: order.seller_nit,
                seller_postal_code: order.seller_postal_code,
                seller_country: order.seller_country,
                seller_email: order.seller_email,
                client_name: order.client_name,
                client_surname: order.client_surname,
                client_address: order.client_address,
                client_address_detail: order.client_address_detail,
                client_city: order.client_city,
                client_state: order.client_state,
                client_telephone: order.client_telephone,
                products: order.products,
                client_country: order.client_country,
                value_to_collect: order.value_to_collect
            };
            return order_filtered;
        };
    }
    OrderService.prototype.registerOrder = function (_a) {
        var depot_name = _a.depot_name, depot_id = _a.depot_id, guide = _a.guide, guide_status = _a.guide_status, seller_id = _a.seller_id, seller_address = _a.seller_address, seller_city = _a.seller_city, seller_state = _a.seller_state, seller_telephone = _a.seller_telephone, seller_nit = _a.seller_nit, seller_postal_code = _a.seller_postal_code, seller_country = _a.seller_country, seller_email = _a.seller_email, client_name = _a.client_name, client_surname = _a.client_surname, client_email = _a.client_email, client_address = _a.client_address, latitude = _a.latitude, longitude = _a.longitude, client_address_detail = _a.client_address_detail, client_city = _a.client_city, client_state = _a.client_state, client_telephone = _a.client_telephone, products = _a.products, client_country = _a.client_country, value_to_collect = _a.value_to_collect, postalCode = _a.postalCode;
        return __awaiter(this, void 0, void 0, function () {
            var orderValue, orderCreated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        products = JSON.parse(products);
                        orderValue = new order_value_1.OrderValue({
                            depot_name: depot_name,
                            depot_id: depot_id,
                            guide: guide,
                            guide_status: guide_status,
                            seller_address: seller_address,
                            seller_id: seller_id,
                            seller_city: seller_city,
                            seller_state: seller_state,
                            seller_telephone: seller_telephone,
                            seller_nit: seller_nit,
                            seller_postal_code: seller_postal_code,
                            seller_country: seller_country,
                            seller_email: seller_email,
                            client_name: client_name,
                            client_surname: client_surname,
                            client_email: client_email,
                            client_address: client_address,
                            latitude: latitude,
                            longitude: longitude,
                            client_address_detail: client_address_detail,
                            client_city: client_city,
                            client_state: client_state,
                            client_telephone: client_telephone,
                            products: products,
                            client_country: client_country,
                            value_to_collect: value_to_collect
                        });
                        return [4 /*yield*/, this.orderRepository.registerOrder(orderValue, postalCode)];
                    case 1:
                        orderCreated = _b.sent();
                        // const order_response = {
                        //   id: orderCreated.id,
                        // };
                        // return order_response;
                        return [2 /*return*/, orderCreated];
                }
            });
        });
    };
    OrderService.prototype.updateOrder = function (id, _a) {
        var depot_name = _a.depot_name, depot_id = _a.depot_id, guide = _a.guide, guide_status = _a.guide_status, seller_id = _a.seller_id, seller_address = _a.seller_address, seller_city = _a.seller_city, seller_state = _a.seller_state, seller_telephone = _a.seller_telephone, seller_nit = _a.seller_nit, seller_postal_code = _a.seller_postal_code, seller_country = _a.seller_country, seller_email = _a.seller_email, client_name = _a.client_name, client_surname = _a.client_surname, client_email = _a.client_email, client_address = _a.client_address, client_address_detail = _a.client_address_detail, client_city = _a.client_city, client_state = _a.client_state, client_telephone = _a.client_telephone, products = _a.products, client_country = _a.client_country, value_to_collect = _a.value_to_collect;
        return __awaiter(this, void 0, void 0, function () {
            var old_order, orderValue, orderUpdated, order_response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        products = JSON.parse(products);
                        return [4 /*yield*/, this.orderRepository.findOrder(id)];
                    case 1:
                        old_order = _b.sent();
                        if (!old_order)
                            throw new Error("Order not found");
                        orderValue = new order_value_1.OrderValue({
                            depot_name: depot_name,
                            depot_id: depot_id,
                            guide: old_order.guide,
                            guide_status: guide_status,
                            seller_id: seller_id,
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
                            client_email: client_email,
                            client_address: client_address,
                            client_address_detail: client_address_detail,
                            client_city: client_city,
                            client_state: client_state,
                            client_telephone: client_telephone,
                            products: products,
                            client_country: client_country,
                            value_to_collect: value_to_collect,
                        });
                        // const exist = await this.orderExist(guide);
                        // if (exist) throw new Error("Order guide already exist");
                        orderValue.id = id;
                        return [4 /*yield*/, this.orderRepository.updateOrder(id, orderValue)];
                    case 2:
                        orderUpdated = _b.sent();
                        order_response = {
                            id: orderUpdated.id,
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
                        if (!order)
                            throw new Error("Order not found");
                        order = order[0];
                        return [2 /*return*/, this.filterOrder(order)];
                }
            });
        });
    };
    OrderService.prototype.getOrdersPage = function (seller_id, pag) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.getOrdersPage(seller_id, pag)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    OrderService.prototype.findOrderByGuide = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOrderByGuide(guide)];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            throw new Error("Order not found");
                        // order = order[0];
                        return [2 /*return*/, this.filterOrder(order)];
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
    OrderService.prototype.allOrder = function (seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, orders_filtered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.allOrder(seller_id)];
                    case 1:
                        orders = _a.sent();
                        orders_filtered = {
                            size: 0,
                            orders: [],
                        };
                        orders_filtered.orders = orders.map(function (order) {
                            return {
                                id: order.id,
                                depot_name: order.depot_name,
                                depot_id: order.depot_id,
                                guide: order.guide,
                                guide_status: order.guide_status,
                                seller_id: order.seller_id,
                                seller_address: order.seller_address,
                                seller_city: order.seller_city,
                                seller_state: order.seller_state,
                                seller_telephone: order.seller_telephone,
                                seller_nit: order.seller_nit,
                                seller_postal_code: order.seller_postal_code,
                                seller_country: order.seller_country,
                                seller_email: order.seller_email,
                                client_name: order.client_name,
                                client_surname: order.client_surname,
                                client_address: order.client_address,
                                client_address_detail: order.client_address_detail,
                                client_city: order.client_city,
                                client_state: order.client_state,
                                client_telephone: order.client_telephone,
                                products: order.products,
                                client_country: order.client_country,
                                value_to_collect: order.value_to_collect,
                                createdAt: order.createdAt
                            };
                        });
                        orders_filtered.size = orders_filtered.orders.length;
                        return [2 /*return*/, orders_filtered];
                }
            });
        });
    };
    OrderService.prototype.insertStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var insertedStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.insertStatus()];
                    case 1:
                        insertedStatus = _a.sent();
                        return [2 /*return*/, insertedStatus];
                }
            });
        });
    };
    OrderService.prototype.updateStatus = function (id, guide_status) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.updateStatus(id, guide_status)];
                    case 1:
                        updatedStatus = _a.sent();
                        return [2 /*return*/, updatedStatus];
                }
            });
        });
    };
    OrderService.prototype.allOrders = function (pag) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.allOrders(pag)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    OrderService.prototype.ordersDate = function (rol, date, seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.ordersDate(rol, date, seller_id)];
                    case 1:
                        ordersDate = _a.sent();
                        return [2 /*return*/, ordersDate];
                }
            });
        });
    };
    OrderService.prototype.authR99 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderRepository.authR99()];
            });
        });
    };
    OrderService.prototype.createScenario = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderRepository.createScenario()];
            });
        });
    };
    OrderService.prototype.orderReports = function (start, ending, seller_id, rol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderRepository.orderReports(start, ending, seller_id, rol)];
            });
        });
    };
    OrderService.prototype.recentOrders = function (rol, seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderRepository.recentOrders(rol, seller_id)];
            });
        });
    };
    OrderService.prototype.orderTraceability = function (code, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.orderRepository.orderTraceability(code, status)];
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
