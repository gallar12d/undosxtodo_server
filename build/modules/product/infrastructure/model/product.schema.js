"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    id: { type: String },
    depots_ids: { type: [] },
    sku: { type: String },
    name: { type: String },
    price: { type: Number }
}, { timestamps: true });
var ProductModel = (0, mongoose_1.model)("products", ProductSchema);
exports.default = ProductModel;
