"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var VehicleSchema = new mongoose_1.default.Schema({
    id: { type: String },
    dealer_id: { type: String },
    zone_id: { type: String },
    ruta99_id: { type: Number },
    code: { type: String },
    capacity: { type: String },
    name: { type: String },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    description: { type: String, required: false },
    depot_id: { type: String, required: false },
    picture: { type: String, required: false },
    vehicle_type: { type: String, required: false },
    status: { type: String },
    availability: { type: String, require: false }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } }
//   { timestamps: true }
);
VehicleSchema.plugin(mongoose_paginate_v2_1.default);
var VehicleModel = mongoose_1.default.model('Vehicles', VehicleSchema, 'vehicles');
exports.VehicleModel = VehicleModel;
