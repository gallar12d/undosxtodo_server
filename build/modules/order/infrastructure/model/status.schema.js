"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StatusSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String }
}, { timestamps: true });
var StatusModel = (0, mongoose_1.model)("status", StatusSchema);
exports.default = StatusModel;
