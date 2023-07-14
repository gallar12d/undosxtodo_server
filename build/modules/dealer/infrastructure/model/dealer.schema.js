"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealerModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var DealerSchema = new mongoose_1.default.Schema({
    id: { type: String },
    ruta99_id: { type: Number, required: false },
    name: { type: String },
    phone_number: { type: String, required: false },
    email: { type: String },
    identification: { type: Number, required: false },
    role: { type: String },
    password: { type: String },
    rfc: { type: String, required: false },
    driver_license: { type: String, required: false },
    status: { type: String }
}, { timestamps: { currentTime: function () { return new Date(Date.now() - 5 * 60 * 60 * 1000); } } }
//   { timestamps: true }
);
DealerSchema.plugin(mongoose_paginate_v2_1.default);
var DealerModel = mongoose_1.default.model('Dealers', DealerSchema, 'dealers');
exports.DealerModel = DealerModel;
