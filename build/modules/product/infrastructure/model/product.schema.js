"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var ProductSchema = new mongoose_1.default.Schema({
    id: { type: String },
    depots_ids: { type: [] },
    sku: { type: String },
    name: { type: String },
    price: { type: Number }
}, { timestamps: true });
ProductSchema.plugin(mongoose_paginate_v2_1.default);
var ProductModel = mongoose_1.default.model('Products', ProductSchema, 'products');
exports.ProductModel = ProductModel;
