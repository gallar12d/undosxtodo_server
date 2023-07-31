"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSettingModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var OrderSettingSchema = new mongoose_1.default.Schema({
    id: { type: String },
    limitHour: { type: Number },
    limitMinutes: { type: Number },
    maxAmountPerZone: { type: Number },
    ordersLimitPerZone: { type: Number },
    zoneTime: { type: Number },
    limitShipments: { type: Number },
    openingHour: { type: Number },
    openingMinutes: { type: Number }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } }
//   { timestamps: true }
);
OrderSettingSchema.plugin(mongoose_paginate_v2_1.default);
var OrderSettingModel = mongoose_1.default.model('OrdersSettings', OrderSettingSchema, 'ordersSettings');
exports.OrderSettingModel = OrderSettingModel;
