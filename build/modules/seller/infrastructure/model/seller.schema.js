"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SellerSchema = new mongoose_1.Schema({
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
var SellerModel = (0, mongoose_1.model)("seller", SellerSchema);
exports.default = SellerModel;
