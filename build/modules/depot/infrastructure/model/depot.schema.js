"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepotModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// const paginate= require('mongoose-paginate-v2');
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var DepotSchema = new mongoose_1.default.Schema({
    id: { type: String },
    seller_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'sellers',
    },
    ruta99_id: { type: Number, required: false },
    state: { type: String },
    city: { type: String },
    name: { type: String },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    address: { type: String },
    status: { type: String }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } });
DepotSchema.plugin(mongoose_paginate_v2_1.default);
var DepotModel = mongoose_1.default.model('Depots', DepotSchema, 'depots');
exports.DepotModel = DepotModel;
