"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    id: { type: String },
    name: String,
    email: String,
    password: String,
}, { timestamps: true });
var UserModel = (0, mongoose_1.model)("users", UserSchema);
exports.default = UserModel;
