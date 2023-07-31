"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var SellerSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    telephone: { type: String },
    nit: { type: String },
    postal_code: { type: String },
    email: { type: String },
}, { timestamps: true });
SellerSchema.plugin(mongoose_paginate_v2_1.default);
var SellerModel = mongoose_1.default.model('Sellers', SellerSchema, 'sellers');
exports.SellerModel = SellerModel;
