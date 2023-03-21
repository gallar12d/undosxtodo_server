"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
var product_schema_1 = __importDefault(require("../model/product.schema"));
var depot_schema_1 = __importDefault(require("../../../depot/infrastructure/model/depot.schema"));
var mongoose_1 = __importDefault(require("mongoose"));
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
    }
    MongoRepository.prototype.insertProduct = function (newProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var insertedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_schema_1.default.create(newProduct)];
                    case 1:
                        insertedProduct = _a.sent();
                        return [2 /*return*/, insertedProduct];
                }
            });
        });
    };
    MongoRepository.prototype.getProducts = function (depots_ids) {
        var _a, depots_ids_1, depots_ids_1_1;
        var _b, e_1, _c, _d, _e, e_2, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var products, result, depot_id, e_1_1, hash, _h, products_1, products_1_1, product, _j, e_2_1;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        products = [];
                        result = [];
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 9, 10, 15]);
                        _a = true, depots_ids_1 = __asyncValues(depots_ids);
                        _k.label = 2;
                    case 2: return [4 /*yield*/, depots_ids_1.next()];
                    case 3:
                        if (!(depots_ids_1_1 = _k.sent(), _b = depots_ids_1_1.done, !_b)) return [3 /*break*/, 8];
                        _d = depots_ids_1_1.value;
                        _a = false;
                        _k.label = 4;
                    case 4:
                        _k.trys.push([4, , 6, 7]);
                        depot_id = _d;
                        return [4 /*yield*/, product_schema_1.default.find({ "depots_ids": { $all: ["".concat(depot_id._id)] } }, { id: 1, name: 1, price: 1, depots_ids: 1 })];
                    case 5:
                        result = _k.sent();
                        products = products.concat(result.map(function (r) { return r; }));
                        return [3 /*break*/, 7];
                    case 6:
                        _a = true;
                        return [7 /*endfinally*/];
                    case 7: return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _k.trys.push([10, , 13, 14]);
                        if (!(!_a && !_b && (_c = depots_ids_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _c.call(depots_ids_1)];
                    case 11:
                        _k.sent();
                        _k.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15:
                        hash = {};
                        products = products.filter(function (product) { return hash[product._id] ? false : hash[product._id] = true; });
                        _k.label = 16;
                    case 16:
                        _k.trys.push([16, 24, 25, 30]);
                        _h = true, products_1 = __asyncValues(products);
                        _k.label = 17;
                    case 17: return [4 /*yield*/, products_1.next()];
                    case 18:
                        if (!(products_1_1 = _k.sent(), _e = products_1_1.done, !_e)) return [3 /*break*/, 23];
                        _g = products_1_1.value;
                        _h = false;
                        _k.label = 19;
                    case 19:
                        _k.trys.push([19, , 21, 22]);
                        product = _g;
                        _j = product;
                        return [4 /*yield*/, Promise.all(product.depots_ids.map(function (depot_id) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, depot_schema_1.default.findOne({ _id: depot_id }, { name: 1 })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 20:
                        _j.depots_ids = _k.sent();
                        return [3 /*break*/, 22];
                    case 21:
                        _h = true;
                        return [7 /*endfinally*/];
                    case 22: return [3 /*break*/, 17];
                    case 23: return [3 /*break*/, 30];
                    case 24:
                        e_2_1 = _k.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 30];
                    case 25:
                        _k.trys.push([25, , 28, 29]);
                        if (!(!_h && !_e && (_f = products_1.return))) return [3 /*break*/, 27];
                        return [4 /*yield*/, _f.call(products_1)];
                    case 26:
                        _k.sent();
                        _k.label = 27;
                    case 27: return [3 /*break*/, 29];
                    case 28:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 29: return [7 /*endfinally*/];
                    case 30: return [2 /*return*/, products];
                }
            });
        });
    };
    MongoRepository.prototype.updateProduct = function (_a) {
        var _id = _a._id, id = _a.id, depots_ids = _a.depots_ids, sku = _a.sku, name = _a.name, price = _a.price;
        return __awaiter(this, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, product_schema_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(_id) }, { $set: { depots_ids: depots_ids, sku: sku, name: name, price: price } })];
                    case 1:
                        updatedProduct = _b.sent();
                        return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    MongoRepository.prototype.deleteProduct = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_schema_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(_id) })];
                    case 1:
                        deletedProduct = _a.sent();
                        return [2 /*return*/, deletedProduct];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
