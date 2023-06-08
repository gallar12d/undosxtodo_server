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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
var inventory_schema_1 = require("../model/inventory.schema");
var seller_schema_1 = require("../../../seller/infrastructure/model/seller.schema");
var depot_schema_1 = require("../../../depot/infrastructure/model/depot.schema");
var product_schema_1 = require("../../../product/infrastructure/model/product.schema");
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
    }
    MongoRepository.prototype.createInventoryObj = function (inventory) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var myInventory, product, inventoryobj, inventoryobj, coincidence, updatedHistory, updatedQuantity, _d, _e, _f, historyObj, e_1_1, inventoryobj2;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        myInventory = {};
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: inventory.product_id })];
                    case 1:
                        product = _k.sent();
                        if (!!product.inventory_ids.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, inventory_schema_1.InventoryModel.create(inventory)];
                    case 2:
                        inventoryobj = _k.sent();
                        return [4 /*yield*/, product_schema_1.ProductModel.updateOne({ id: inventoryobj.product_id }, { $set: { inventory_ids: [inventoryobj.id] } })];
                    case 3:
                        _k.sent();
                        _g = {
                            id: inventoryobj.id,
                            createdAt: inventoryobj.createdAt.toISOString().slice(0, 10)
                        };
                        return [4 /*yield*/, seller_schema_1.SellerModel.findOne({ id: inventoryobj.seller_id })];
                    case 4:
                        _g.seller = (_k.sent()).name;
                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: inventoryobj.depot_id })];
                    case 5:
                        _g.depot = (_k.sent()).name;
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: inventoryobj.product_id })];
                    case 6:
                        myInventory = (_g.product = (_k.sent()).name,
                            _g.quantity = inventoryobj.quantity,
                            _g.location = inventoryobj.location,
                            _g.history = inventoryobj.history,
                            _g);
                        return [2 /*return*/, myInventory];
                    case 7: return [4 /*yield*/, inventory_schema_1.InventoryModel.find({ product_id: product.id })];
                    case 8:
                        inventoryobj = _k.sent();
                        coincidence = inventoryobj.findIndex(function (inv) { return inv.depot_id === inventory.depot_id; });
                        if (!(coincidence !== -1)) return [3 /*break*/, 25];
                        updatedHistory = inventoryobj[coincidence].history;
                        updatedHistory.push(inventory.history[inventory.history.length - 1]);
                        updatedQuantity = 0;
                        _k.label = 9;
                    case 9:
                        _k.trys.push([9, 14, 15, 20]);
                        _d = true, _e = __asyncValues(inventoryobj[coincidence].history);
                        _k.label = 10;
                    case 10: return [4 /*yield*/, _e.next()];
                    case 11:
                        if (!(_f = _k.sent(), _a = _f.done, !_a)) return [3 /*break*/, 13];
                        _c = _f.value;
                        _d = false;
                        try {
                            historyObj = _c;
                            updatedQuantity = updatedQuantity + parseInt(historyObj.quantity);
                        }
                        finally {
                            _d = true;
                        }
                        _k.label = 12;
                    case 12: return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 20];
                    case 14:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 20];
                    case 15:
                        _k.trys.push([15, , 18, 19]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 17];
                        return [4 /*yield*/, _b.call(_e)];
                    case 16:
                        _k.sent();
                        _k.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 19: return [7 /*endfinally*/];
                    case 20: return [4 /*yield*/, inventory_schema_1.InventoryModel.updateOne({ product_id: product.id }, { $set: { history: updatedHistory, quantity: updatedQuantity } })];
                    case 21:
                        _k.sent();
                        _h = {
                            id: inventoryobj[coincidence].id,
                            createdAt: inventoryobj[coincidence].createdAt.toISOString().slice(0, 10)
                        };
                        return [4 /*yield*/, seller_schema_1.SellerModel.findOne({ id: inventoryobj[coincidence].seller_id })];
                    case 22:
                        _h.seller = (_k.sent()).name;
                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: inventoryobj[coincidence].depot_id })];
                    case 23:
                        _h.depot = (_k.sent()).name;
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: inventoryobj[coincidence].product_id })];
                    case 24: return [2 /*return*/, (_h.product = (_k.sent()).name,
                            _h.quantity = updatedQuantity,
                            _h.location = inventoryobj[coincidence].location,
                            _h.history = updatedHistory,
                            _h)];
                    case 25: return [4 /*yield*/, inventory_schema_1.InventoryModel.create(inventory)];
                    case 26:
                        inventoryobj2 = _k.sent();
                        product.inventory_ids.push(inventoryobj2.id);
                        return [4 /*yield*/, product_schema_1.ProductModel.updateOne({ id: inventoryobj2.product_id }, { $set: { inventory_ids: product.inventory_ids } })];
                    case 27:
                        _k.sent();
                        _j = {
                            id: inventoryobj2.id,
                            createdAt: inventoryobj2.createdAt.toISOString().slice(0, 10)
                        };
                        return [4 /*yield*/, seller_schema_1.SellerModel.findOne({ id: inventoryobj2.seller_id })];
                    case 28:
                        _j.seller = (_k.sent()).name;
                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: inventoryobj2.depot_id })];
                    case 29:
                        _j.depot = (_k.sent()).name;
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: inventoryobj2.product_id })];
                    case 30: return [2 /*return*/, (_j.product = (_k.sent()).name,
                            _j.quantity = inventoryobj2.quantity,
                            _j.location = inventoryobj2.location,
                            _j.history = inventoryobj2.history,
                            _j)];
                }
            });
        });
    };
    MongoRepository.prototype.getInventory = function () {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var inventoryobj, myInventory, _d, inventoryobj_1, inventoryobj_1_1, obj, _e, _f, e_2_1;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, inventory_schema_1.InventoryModel.find()];
                    case 1:
                        inventoryobj = _h.sent();
                        myInventory = [];
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 12, 13, 18]);
                        _d = true, inventoryobj_1 = __asyncValues(inventoryobj);
                        _h.label = 3;
                    case 3: return [4 /*yield*/, inventoryobj_1.next()];
                    case 4:
                        if (!(inventoryobj_1_1 = _h.sent(), _a = inventoryobj_1_1.done, !_a)) return [3 /*break*/, 11];
                        _c = inventoryobj_1_1.value;
                        _d = false;
                        _h.label = 5;
                    case 5:
                        _h.trys.push([5, , 9, 10]);
                        obj = _c;
                        _f = (_e = myInventory).push;
                        _g = {
                            id: obj.id,
                            createdAt: obj.createdAt.toISOString().slice(0, 10)
                        };
                        return [4 /*yield*/, seller_schema_1.SellerModel.findOne({ id: obj.seller_id })];
                    case 6:
                        _g.seller = (_h.sent()).name;
                        return [4 /*yield*/, depot_schema_1.DepotModel.findOne({ id: obj.depot_id })];
                    case 7:
                        _g.depot = (_h.sent()).name;
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: obj.product_id })];
                    case 8:
                        _f.apply(_e, [(_g.product = (_h.sent()).name,
                                _g.quantity = obj.quantity,
                                _g.history = obj.history,
                                _g)]);
                        return [3 /*break*/, 10];
                    case 9:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 10: return [3 /*break*/, 3];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _h.trys.push([13, , 16, 17]);
                        if (!(!_d && !_a && (_b = inventoryobj_1.return))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _b.call(inventoryobj_1)];
                    case 14:
                        _h.sent();
                        _h.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [2 /*return*/, myInventory];
                }
            });
        });
    };
    MongoRepository.prototype.editInventoryObj = function (inventoryObj, queryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inventory_schema_1.InventoryModel.updateOne({ id: queryId }, {
                            $set: {
                                seller_id: inventoryObj.seller_id,
                                product_id: inventoryObj.product_id,
                                quantity: inventoryObj.quantity,
                                depot_id: inventoryObj.depot_id,
                                history: inventoryObj.history
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoRepository.prototype.getRelatedDepots = function (seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            var depotIds, relatedDepots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inventory_schema_1.InventoryModel.find({ seller_id: seller_id }, { depot_id: 1 })];
                    case 1:
                        depotIds = _a.sent();
                        return [4 /*yield*/, depot_schema_1.DepotModel.find({ $and: [{ "id": { $in: depotIds.map(function (depot) { return depot.depot_id; }) } }, { status: "active" }] })];
                    case 2:
                        relatedDepots = _a.sent();
                        return [2 /*return*/, relatedDepots];
                }
            });
        });
    };
    MongoRepository.prototype.getProducts = function (depot_id, seller_id) {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var invProducts, myProducts, _d, invProducts_1, invProducts_1_1, product, currentProduct, e_3_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, inventory_schema_1.InventoryModel.find({ depot_id: depot_id, seller_id: seller_id }, { product_id: 1, quantity: 1 })];
                    case 1:
                        invProducts = _e.sent();
                        myProducts = [];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 10, 11, 16]);
                        _d = true, invProducts_1 = __asyncValues(invProducts);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, invProducts_1.next()];
                    case 4:
                        if (!(invProducts_1_1 = _e.sent(), _a = invProducts_1_1.done, !_a)) return [3 /*break*/, 9];
                        _c = invProducts_1_1.value;
                        _d = false;
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, , 7, 8]);
                        product = _c;
                        return [4 /*yield*/, product_schema_1.ProductModel.findOne({ id: product.product_id })];
                    case 6:
                        currentProduct = _e.sent();
                        myProducts.push({
                            _id: currentProduct._id,
                            id: currentProduct.id,
                            depots_ids: currentProduct.depots_ids,
                            sku: currentProduct.sku,
                            name: currentProduct.name,
                            price: currentProduct.price,
                            status: currentProduct.status,
                            inventory_ids: currentProduct.inventory_ids,
                            totalQuantity: product.quantity
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(!_d && !_a && (_b = invProducts_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(invProducts_1)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, myProducts];
                }
            });
        });
    };
    MongoRepository.prototype.subtractAmount = function (product_ids, depot_id, date, transacction_type) {
        var _a, product_ids_1, product_ids_1_1;
        var _b, e_4, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var product, currentInventory, currentHistory, e_4_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 9, 10, 15]);
                        _a = true, product_ids_1 = __asyncValues(product_ids);
                        _e.label = 1;
                    case 1: return [4 /*yield*/, product_ids_1.next()];
                    case 2:
                        if (!(product_ids_1_1 = _e.sent(), _b = product_ids_1_1.done, !_b)) return [3 /*break*/, 8];
                        _d = product_ids_1_1.value;
                        _a = false;
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, , 6, 7]);
                        product = _d;
                        return [4 /*yield*/, inventory_schema_1.InventoryModel.findOne({ product_id: product.id, depot_id: depot_id })];
                    case 4:
                        currentInventory = _e.sent();
                        currentHistory = currentInventory.history;
                        currentHistory.push({
                            date: date,
                            quantity: product.quantity,
                            transaccion_type: transacction_type
                        });
                        return [4 /*yield*/, inventory_schema_1.InventoryModel.updateOne({ product_id: product.id, depot_id: depot_id }, {
                                $set: {
                                    quantity: currentInventory.quantity + product.quantity,
                                    history: currentHistory
                                }
                            })];
                    case 5:
                        _e.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = true;
                        return [7 /*endfinally*/];
                    case 7: return [3 /*break*/, 1];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_4_1 = _e.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _e.trys.push([10, , 13, 14]);
                        if (!(!_a && !_b && (_c = product_ids_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _c.call(product_ids_1)];
                    case 11:
                        _e.sent();
                        _e.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/, 200];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
