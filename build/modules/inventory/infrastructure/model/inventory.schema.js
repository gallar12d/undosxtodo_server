"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var InventorySchema = new mongoose_1.default.Schema({
    id: { type: String },
    seller_id: { type: String },
    product_id: { type: String },
    quantity: { type: Number },
    depot_id: { type: String },
    history: { type: Array }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } }
//   { timestamps: true }
);
InventorySchema.plugin(mongoose_paginate_v2_1.default);
var InventoryModel = mongoose_1.default.model('Inventory', InventorySchema, 'inventory');
exports.InventoryModel = InventoryModel;
