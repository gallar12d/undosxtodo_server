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
import { InventoryModel } from "../model/inventory.schema";
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import { ProductModel } from "../../../product/infrastructure/model/product.schema";
export class MongoRepository {
    createInventoryObj(inventory) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let myInventory = {};
            const product = yield ProductModel.findOne({ id: inventory.product_id });
            if (!product.inventory_ids.length) {
                const inventoryobj = yield InventoryModel.create(inventory);
                yield ProductModel.updateOne({ id: inventoryobj.product_id }, { $set: { inventory_ids: [inventoryobj.id] } });
                myInventory = {
                    id: inventoryobj.id,
                    createdAt: inventoryobj.createdAt.toISOString().slice(0, 10),
                    seller: (yield SellerModel.findOne({ id: inventoryobj.seller_id })).name,
                    depot: (yield DepotModel.findOne({ id: inventoryobj.depot_id })).name,
                    product: (yield ProductModel.findOne({ id: inventoryobj.product_id })).name,
                    quantity: inventoryobj.quantity,
                    location: inventoryobj.location,
                    history: inventoryobj.history
                };
                return myInventory;
            }
            else {
                const inventoryobj = yield InventoryModel.find({ product_id: product.id });
                // Busca coinciddencias entre depot_id ingresado que es: inventory.depot_id y el arreglo de inventario donde se encuentra el producto
                const coincidence = inventoryobj.findIndex((inv) => inv.depot_id === inventory.depot_id);
                // Esta condicion es para cuando existe la coincidencia, el else es para cuando no.
                if (coincidence !== -1) {
                    const updatedHistory = inventoryobj[coincidence].history;
                    updatedHistory.push(inventory.history[inventory.history.length - 1]);
                    let updatedQuantity = 0;
                    try {
                        for (var _d = true, _e = __asyncValues(inventoryobj[coincidence].history), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                            _c = _f.value;
                            _d = false;
                            try {
                                const historyObj = _c;
                                updatedQuantity = updatedQuantity + parseInt(historyObj.quantity);
                            }
                            finally {
                                _d = true;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    yield InventoryModel.updateOne({ product_id: product.id }, { $set: { history: updatedHistory, quantity: updatedQuantity, status: inventory.status } });
                    return {
                        id: inventoryobj[coincidence].id,
                        createdAt: inventoryobj[coincidence].createdAt.toISOString().slice(0, 10),
                        seller: (yield SellerModel.findOne({ id: inventoryobj[coincidence].seller_id })).name,
                        depot: (yield DepotModel.findOne({ id: inventoryobj[coincidence].depot_id })).name,
                        product: (yield ProductModel.findOne({ id: inventoryobj[coincidence].product_id })).name,
                        quantity: updatedQuantity,
                        location: inventoryobj[coincidence].location,
                        history: updatedHistory
                    };
                }
                else {
                    const inventoryobj2 = yield InventoryModel.create(inventory);
                    product.inventory_ids.push(inventoryobj2.id);
                    yield ProductModel.updateOne({ id: inventoryobj2.product_id }, { $set: { inventory_ids: product.inventory_ids } });
                    return {
                        id: inventoryobj2.id,
                        createdAt: inventoryobj2.createdAt.toISOString().slice(0, 10),
                        seller: (yield SellerModel.findOne({ id: inventoryobj2.seller_id })).name,
                        depot: (yield DepotModel.findOne({ id: inventoryobj2.depot_id })).name,
                        product: (yield ProductModel.findOne({ id: inventoryobj2.product_id })).name,
                        quantity: inventoryobj2.quantity,
                        location: inventoryobj2.location,
                        history: inventoryobj2.history
                    };
                }
                // if (inventoryobj.depot_id === inventory.depot_id) {
                //     const updatedHistory = inventoryobj.history;
                //     updatedHistory.push(inventory.history[inventory.history.length - 1]);
                //     let updatedQuantity = 0;
                //     for await (const historyObj of inventoryobj.history) {
                //         updatedQuantity = updatedQuantity + parseInt(historyObj.quantity);
                //     }
                //     await InventoryModel.updateOne({ product_id: product.id }, { $set: { history: updatedHistory, quantity: updatedQuantity } });
                //     return {
                //         id: inventoryobj.id,
                //         createdAt: inventoryobj.createdAt.toISOString().slice(0, 10),
                //         seller: (await SellerModel.findOne({ id: inventoryobj.seller_id })).name,
                //         depot: (await DepotModel.findOne({ id: inventoryobj.depot_id })).name,
                //         product: (await ProductModel.findOne({ id: inventoryobj.product_id })).name,
                //         quantity: updatedQuantity,
                //         location: inventoryobj.location,
                //         history: updatedHistory
                //     };
                // } else {
                //     const inventoryobj2 = await InventoryModel.create(inventory);
                //     product.inventory_ids.push(inventoryobj2.id);
                //     await ProductModel.updateOne({ id: inventoryobj2.product_id }, { $set: { inventory_ids: product.inventory_ids } });
                //     return {
                //         id: inventoryobj2.id,
                //         createdAt: inventoryobj2.createdAt.toISOString().slice(0, 10),
                //         seller: (await SellerModel.findOne({ id: inventoryobj2.seller_id })).name,
                //         depot: (await DepotModel.findOne({ id: inventoryobj2.depot_id })).name,
                //         product: (await ProductModel.findOne({ id: inventoryobj2.product_id })).name,
                //         quantity: inventoryobj2.quantity,
                //         location: inventoryobj2.location,
                //         history: inventoryobj2.history
                //     }
                // }
                // return 200;
            }
        });
    }
    getInventory() {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const inventoryobj = yield InventoryModel.find({ status: "active" });
            const myInventory = [];
            try {
                for (var _d = true, inventoryobj_1 = __asyncValues(inventoryobj), inventoryobj_1_1; inventoryobj_1_1 = yield inventoryobj_1.next(), _a = inventoryobj_1_1.done, !_a;) {
                    _c = inventoryobj_1_1.value;
                    _d = false;
                    try {
                        const obj = _c;
                        myInventory.push({
                            id: obj.id,
                            createdAt: obj.createdAt.toISOString().slice(0, 10),
                            seller: (yield SellerModel.findOne({ id: obj.seller_id })).name,
                            depot: (yield DepotModel.findOne({ id: obj.depot_id })).name,
                            product: (yield ProductModel.findOne({ id: obj.product_id })).name,
                            quantity: obj.quantity,
                            history: obj.history
                        });
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = inventoryobj_1.return)) yield _b.call(inventoryobj_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return myInventory;
        });
    }
    editInventoryObj(inventoryObj, queryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield InventoryModel.updateOne({ id: queryId }, {
                $set: {
                    seller_id: inventoryObj.seller_id,
                    product_id: inventoryObj.product_id,
                    quantity: inventoryObj.quantity,
                    depot_id: inventoryObj.depot_id,
                    history: inventoryObj.history
                }
            });
        });
    }
    getRelatedSellers(pag) {
        var _a, e_3, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 6,
                sort: { createdAt: -1 }
            };
            const result = yield SellerModel.paginate({}, options);
            const myRelatedSellers = [];
            try {
                for (var _d = true, _e = __asyncValues(result.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const seller = _c;
                        if (seller.name !== "Ultimilla") {
                            // const sellerDepots = await InventoryModel.find({ seller_id: seller.id }, { depot_id: 1, createdAt: 1 });
                            const sellerDepots = yield InventoryModel.find({ $and: [{ seller_id: seller.id }, { status: "active" }] }, { depot_id: 1, createdAt: 1 });
                            if (sellerDepots.length > 0) {
                                myRelatedSellers.push({
                                    id: seller.id,
                                    createdAt: sellerDepots[0].createdAt.toISOString().slice(0, 10),
                                    seller: seller.name,
                                    depots: yield DepotModel.find({ $and: [{ "id": { $in: sellerDepots.map((sd) => sd.depot_id) } }] }, { id: 1, name: 1 })
                                });
                            }
                            ;
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
            return myRelatedSellers;
        });
    }
    setInventoryStatus(seller_id, depots) {
        var _a, depots_1, depots_1_1;
        var _b, e_4, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const result = await InventoryModel.find({ seller_id, depot_id: depots.map((depot: any) => depot.id) });
                for (_a = true, depots_1 = __asyncValues(depots); depots_1_1 = yield depots_1.next(), _b = depots_1_1.done, !_b;) {
                    _d = depots_1_1.value;
                    _a = false;
                    try {
                        const depot = _d;
                        yield InventoryModel.updateMany({
                            $and: [
                                { seller_id },
                                { depot_id: depot.id }
                            ]
                        }, {
                            $set: {
                                status: depot.status
                            }
                        });
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = depots_1.return)) yield _c.call(depots_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return 200;
        });
    }
    getRelatedDepots(seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const depotIds = yield InventoryModel.find({ $and: [{ seller_id }, { status: "active" }] }, { depot_id: 1 });
            const relatedDepots = yield DepotModel.find({ $and: [{ "id": { $in: depotIds.map((depot) => depot.depot_id) } }, { status: "active" }] });
            return relatedDepots;
        });
    }
    getProducts(depot_id, seller_id) {
        var _a, e_5, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const invProducts = yield InventoryModel.find({ depot_id, seller_id }, { product_id: 1, quantity: 1 });
            const myProducts = [];
            try {
                for (var _d = true, invProducts_1 = __asyncValues(invProducts), invProducts_1_1; invProducts_1_1 = yield invProducts_1.next(), _a = invProducts_1_1.done, !_a;) {
                    _c = invProducts_1_1.value;
                    _d = false;
                    try {
                        const product = _c;
                        const currentProduct = yield ProductModel.findOne({ id: product.product_id });
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
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = invProducts_1.return)) yield _b.call(invProducts_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return myProducts;
        });
    }
    subtractAmount(product_ids, depot_id, date, transacction_type) {
        var _a, product_ids_1, product_ids_1_1;
        var _b, e_6, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (_a = true, product_ids_1 = __asyncValues(product_ids); product_ids_1_1 = yield product_ids_1.next(), _b = product_ids_1_1.done, !_b;) {
                    _d = product_ids_1_1.value;
                    _a = false;
                    try {
                        const product = _d;
                        const currentInventory = yield InventoryModel.findOne({ product_id: product.id, depot_id });
                        const currentHistory = currentInventory.history;
                        currentHistory.push({
                            date,
                            quantity: product.quantity,
                            transaccion_type: transacction_type
                        });
                        yield InventoryModel.updateOne({ product_id: product.id, depot_id }, {
                            $set: {
                                quantity: currentInventory.quantity + product.quantity,
                                history: currentHistory
                            }
                        });
                    }
                    finally {
                        _a = true;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = product_ids_1.return)) yield _c.call(product_ids_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return 200;
        });
    }
}
