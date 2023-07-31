"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var ZoneSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String },
    codes: { type: [] },
    cityId: { type: String }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } } //Comprobar si funciona
//   { timestamps: true }
);
ZoneSchema.plugin(mongoose_paginate_v2_1.default);
var ZoneModel = mongoose_1.default.model('Zones', ZoneSchema, 'zones');
exports.ZoneModel = ZoneModel;
