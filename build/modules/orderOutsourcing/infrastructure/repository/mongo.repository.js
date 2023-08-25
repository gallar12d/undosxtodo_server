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
var integration_1 = __importDefault(require("shipday/integration"));
var order_info_request_1 = __importDefault(require("shipday/integration/order/request/order.info.request"));
var order_item_1 = __importDefault(require("shipday/integration/order/request/order.item"));
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.shipdayClient = new integration_1.default('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
        // this.shipdayClient.orderService.getOrders().then( (d)=> console.log(d) )
    }
    MongoRepository.prototype.registerOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var res, orderInfoRequest, itemsArr_1, res2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        res = void 0;
                        orderInfoRequest = new order_info_request_1.default(order.orderNumber, order.customerName, order.customerAddress, order.customerEmail, order.customerPhoneNumber, order.sellerName, order.sellerAddress);
                        orderInfoRequest.setRestaurantPhoneNumber(order.sellerPhoneNumber);
                        // orderInfoRequest.setExpectedDeliveryDate(new Date(order.expectedDeliveryDate));
                        // orderInfoRequest.setExpectedDeliveryTime(order.expectedDeliveryTime);
                        // orderInfoRequest.setExpectedPickupTime(order.expectedPickupTime);
                        // orderInfoRequest.setPickupLatLong(order.pickupLatitude, order.pickupLongitude);
                        // orderInfoRequest.setDeliveryLatLong(order.deliveryLatitude, order.deliveryLongitude);
                        // orderInfoRequest.setTips(order.tips);
                        // orderInfoRequest.setTax(order.tax);
                        // orderInfoRequest.setDiscountAmount(order.discountAmount);
                        // orderInfoRequest.setDeliveryFee(order.deliveryFee);
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
                        order.orderId = res2.orderId;
                        return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.create(order)];
                    case 2:
                        res = _a.sent();
                        _a.label = 3;
                    case 3: 
                    // console.log(res2);
                    return [2 /*return*/, res];
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
    MongoRepository.prototype.setOrderStatus = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log(event.order);
                    return [4 /*yield*/, orderOut_schema_1.OrderOutsourcingModel.updateOne({ orderId: event.order.id }, { $set: { orderState: event.order_status } })];
                    case 1:
                        // console.log(event.order);
                        _a.sent();
                        return [2 /*return*/, event];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
