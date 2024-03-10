"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOutsourcingModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var OrderOutsourcingSchema = new mongoose_1.default.Schema({
    id: { type: String },
    orderNumber: { type: String, required: false },
    orderId: { type: Number, required: false },
    customerName: { type: String, required: false },
    customerAddress: { type: String, required: false },
    city: { type: String, required: false },
    customerEmail: { type: String, required: false },
    customerPhoneNumber: { type: String, required: false },
    sellerId: { type: String, required: false },
    depotName: { type: String, required: false },
    depotAddress: { type: String, required: false },
    sellerPhoneNumber: { type: String, required: false },
    expectedDeliveryDate: { type: String, required: false },
    expectedPickupTime: { type: String, required: false },
    expectedDeliveryTime: { type: String, required: false },
    pickupLatitude: { type: String, required: false },
    pickupLongitude: { type: String, required: false },
    deliveryLatitude: { type: String, required: false },
    deliveryLongitude: { type: String, required: false },
    orderItem: { type: Array, required: false },
    tips: { type: Number, required: false },
    tax: { type: Number, required: false },
    discountAmount: { type: Number, required: false },
    deliveryFee: { type: Number, required: false },
    totalOrderCost: { type: Number, required: false },
    pickupInstruction: { type: String, required: false },
    deliveryInstruction: { type: String, required: false },
    orderSource: { type: String, required: false },
    additionalId: { type: String, required: false },
    clientId: { type: Number, required: false },
    paymentMethod: { type: String, required: false },
    creditCardType: { type: String, required: false },
    creditCardId: { type: Number, required: false },
    pickup: { type: Object, required: false },
    dropoff: { type: Object, required: false },
    orderState: { type: String, required: false },
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } } //Comprobar si funciona
// { timestamps: true }
);
OrderOutsourcingSchema.plugin(mongoose_paginate_v2_1.default);
var OrderOutsourcingModel = mongoose_1.default.model('OrdersOutsourcing', OrderOutsourcingSchema, 'ordersOutsourcing');
exports.OrderOutsourcingModel = OrderOutsourcingModel;
