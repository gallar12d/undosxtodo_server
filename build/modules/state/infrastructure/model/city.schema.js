"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CitySchema = new mongoose_1.Schema({
    id: { type: String },
    state_id: { type: String },
    name: { type: String }
}, { timestamps: true });
var CityModel = (0, mongoose_1.model)("cities", CitySchema);
exports.default = CityModel;
