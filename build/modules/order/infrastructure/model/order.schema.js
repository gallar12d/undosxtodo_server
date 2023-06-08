"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var OrderSchema = new mongoose_1.default.Schema({
    id: { type: String },
    depot_name: { type: String, required: false },
    depot_id: { type: String, required: false },
    guide: { type: Number, required: true },
    guide_status: { type: String, required: false },
    seller_id: { type: mongoose_1.default.Types.ObjectId },
    seller_address: { type: String, required: false },
    seller_city: { type: String, required: false },
    seller_state: { type: String, required: false },
    seller_telephone: { type: String, required: false },
    seller_nit: { type: String, required: false },
    seller_postal_code: { type: String, required: false },
    seller_country: { type: String, required: false },
    seller_email: { type: String, required: false },
    //client information
    client_name: { type: String, required: false },
    client_surname: { type: String, required: false },
    client_address: { type: String, required: false },
    client_address_detail: { type: String, required: false },
    client_city: { type: String, required: false },
    client_state: { type: String, required: false },
    client_telephone: { type: String, required: false },
    products: { type: Array, required: false },
    client_country: { type: String, required: false },
    value_to_collect: { type: Number, required: false },
}, 
// { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } } //Comprobar si funciona
{ timestamps: true });
OrderSchema.plugin(mongoose_paginate_v2_1.default);
var OrderModel = mongoose_1.default.model('Orders', OrderSchema, 'orders');
exports.OrderModel = OrderModel;
