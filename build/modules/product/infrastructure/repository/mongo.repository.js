var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { ProductModel } from "../model/product.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import mongoose from "mongoose";
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import { InventoryModel } from "../../../inventory/infrastructure/model/inventory.schema";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
export class MongoRepository {
    insertProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedProduct = yield ProductModel.create(newProduct);
            return insertedProduct;
        });
    }
    getProducts(depots_ids) {
        var _a, depots_ids_1, depots_ids_1_1;
        var _b, e_1, _c, _d, _e, e_2, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            var products = [];
            var result = [];
            try {
                for (_a = true, depots_ids_1 = __asyncValues(depots_ids); depots_ids_1_1 = yield depots_ids_1.next(), _b = depots_ids_1_1.done, !_b;) {
                    _d = depots_ids_1_1.value;
                    _a = false;
                    try {
                        const depot_id = _d;
                        result = yield ProductModel.find({ "depots_ids": { $all: [`${depot_id._id}`] } }, { id: 1, name: 1, price: 1, depots_ids: 1, status: 1 });
                        products = products.concat(result.map(r => r));
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = depots_ids_1.return)) yield _c.call(depots_ids_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            let hash = {};
            products = products.filter((product) => hash[product._id] ? false : hash[product._id] = true);
            try {
                for (var _h = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _e = products_1_1.done, !_e;) {
                    _g = products_1_1.value;
                    _h = false;
                    try {
                        const product = _g;
                        product.depots_ids = yield Promise.all(product.depots_ids.map((depot_id) => __awaiter(this, void 0, void 0, function* () {
                            return yield DepotModel.findOne({ _id: depot_id }, { name: 1 });
                        })));
                    }
                    finally {
                        _h = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_h && !_e && (_f = products_1.return)) yield _f.call(products_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return products;
        });
    }
    getProductsPage(depots_ids, pag) {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 6,
                sort: { createdAt: -1 }
            };
            // var products: any = [];
            var result = [];
            // for await (const depot_id of depots_ids) {
            //     result = await ProductModel.find({ "depots_ids": { $all: [`${depot_id._id}`] } }, { id: 1, name: 1, price: 1, depots_ids: 1, status: 1 });
            //     products = products.concat(result.map(r => r));
            // }
            // result = await ProductModel.paginate({ "depots_ids": { $in: depots_ids.map((d) => d._id) } }, options);
            result = yield ProductModel.paginate({ $and: [{ "depots_ids": { $in: depots_ids.map((d) => d._id) } }, { status: "active" }] }, options);
            // console.log(result);
            // products = products.concat(result.docs.map(r => r));
            let hash = {};
            result.docs = result.docs.filter((product) => hash[product._id] ? false : hash[product._id] = true);
            // for await (const product of result.docs) {
            //     product.depots_ids = await Promise.all(product.depots_ids.map(async (depot_id) => {
            //         return await DepotModel.findOne({ _id: depot_id }, { name: 1 });
            //     }));
            //     // if (product.inventory_ids.length > 0) {
            //     //     myInventories.push(await InventoryModel.find({ $and: [{ "id": { $in: product.inventory_ids.map((p) => p) } }] }));
            //     // }
            // }
            const myProducts = [];
            try {
                for (var _d = true, _e = __asyncValues(result.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const product = _c;
                        if (product.inventory_ids.length > 0) {
                            const productInventories = (yield InventoryModel.find({ $and: [{ "id": { $in: product.inventory_ids.map((p) => p) } }, { status: "active" }] }));
                            const ultimilla_depots = yield DepotModel.find({ $and: [{ "id": { $in: productInventories.map((pi) => pi.depot_id) } }, { status: "active" }] }, { id: 1, name: 1 });
                            myProducts.push({
                                id: product.id,
                                depots_ids: yield DepotModel.find({ $and: [{ "_id": { $in: product.depots_ids.map((depot_id) => depot_id) } }, { status: "active" }] }, { name: 1 }),
                                sku: product.sku,
                                name: product.name,
                                price: product.price,
                                status: product.status,
                                inventories: productInventories,
                                ultimilla_depots
                            });
                        }
                        else {
                            myProducts.push({
                                id: product.id,
                                depots_ids: yield DepotModel.find({ $and: [{ "_id": { $in: product.depots_ids.map((depot_id) => depot_id) } }, { status: "active" }] }, { name: 1 }),
                                sku: product.sku,
                                name: product.name,
                                price: product.price,
                                status: product.status,
                                inventory_ids: []
                            });
                        }
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            result.docs = myProducts;
            return result;
        });
    }
    updateProduct({ _id, id, depots_ids, sku, name, price, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield ProductModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) }, { $set: { depots_ids: depots_ids, sku: sku, name: name, price: price, status: status } });
            return updatedProduct;
        });
    }
    deleteProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield ProductModel.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
            return deletedProduct;
        });
    }
    allProducts(pag) {
        var _a, e_4, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 7,
                sort: { createdAt: -1 }
            };
            var result = yield ProductModel.paginate({}, options);
            const products = JSON.parse(JSON.stringify(result));
            try {
                for (var _d = true, _e = __asyncValues(products.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        var product = _c;
                        product.depots_ids = yield Promise.all(product.depots_ids.map((depot_id) => __awaiter(this, void 0, void 0, function* () {
                            const depot = yield DepotModel.findOne({ _id: depot_id }, { name: 1, seller_id: 1 });
                            product.seller = (yield SellerModel.findOne({ _id: depot.seller_id })).name;
                            return depot;
                        })));
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return products;
        });
    }
}
