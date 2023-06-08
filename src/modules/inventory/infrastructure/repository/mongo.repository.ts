import mongoose from "mongoose";
import { InventoryRepository } from "../../domain/inventory.repository";
import { InventoryModel } from "../model/inventory.schema";
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import { ProductModel } from "../../../product/infrastructure/model/product.schema";
import { InventoryEntity } from "../../domain/inventory.entity";

export class MongoRepository implements InventoryRepository {

    public async createInventoryObj(inventory: InventoryEntity): Promise<any | null> {
        let myInventory = {};
        const product = await ProductModel.findOne({ id: inventory.product_id });

        if (!product.inventory_ids.length) {

            const inventoryobj = await InventoryModel.create(inventory);
            await ProductModel.updateOne({ id: inventoryobj.product_id }, { $set: { inventory_ids: [inventoryobj.id] } });
            myInventory = {
                id: inventoryobj.id,
                createdAt: inventoryobj.createdAt.toISOString().slice(0, 10),
                seller: (await SellerModel.findOne({ id: inventoryobj.seller_id })).name,
                depot: (await DepotModel.findOne({ id: inventoryobj.depot_id })).name,
                product: (await ProductModel.findOne({ id: inventoryobj.product_id })).name,
                quantity: inventoryobj.quantity,
                location: inventoryobj.location,
                history: inventoryobj.history

            };
            return myInventory;
        } else {
            const inventoryobj = await InventoryModel.find({ product_id: product.id });
            // Busca coinciddencias entre depot_id ingresado que es: inventory.depot_id y el arreglo de inventario donde se encuentra el producto
            const coincidence = inventoryobj.findIndex((inv) => inv.depot_id === inventory.depot_id);
            // Esta condicion es para cuando existe la coincidencia, el else es para cuando no.
            if (coincidence !== -1) {
                const updatedHistory = inventoryobj[coincidence].history;
                updatedHistory.push(inventory.history[inventory.history.length - 1]);
                let updatedQuantity = 0;

                for await (const historyObj of inventoryobj[coincidence].history) {
                    updatedQuantity = updatedQuantity + parseInt(historyObj.quantity);
                }
                await InventoryModel.updateOne({ product_id: product.id }, { $set: { history: updatedHistory, quantity: updatedQuantity } });
                return {
                    id: inventoryobj[coincidence].id,
                    createdAt: inventoryobj[coincidence].createdAt.toISOString().slice(0, 10),
                    seller: (await SellerModel.findOne({ id: inventoryobj[coincidence].seller_id })).name,
                    depot: (await DepotModel.findOne({ id: inventoryobj[coincidence].depot_id })).name,
                    product: (await ProductModel.findOne({ id: inventoryobj[coincidence].product_id })).name,
                    quantity: updatedQuantity,
                    location: inventoryobj[coincidence].location,
                    history: updatedHistory
                };
            } else {
                const inventoryobj2 = await InventoryModel.create(inventory);
                product.inventory_ids.push(inventoryobj2.id);
                await ProductModel.updateOne({ id: inventoryobj2.product_id }, { $set: { inventory_ids: product.inventory_ids } });
                return {
                    id: inventoryobj2.id,
                    createdAt: inventoryobj2.createdAt.toISOString().slice(0, 10),
                    seller: (await SellerModel.findOne({ id: inventoryobj2.seller_id })).name,
                    depot: (await DepotModel.findOne({ id: inventoryobj2.depot_id })).name,
                    product: (await ProductModel.findOne({ id: inventoryobj2.product_id })).name,
                    quantity: inventoryobj2.quantity,
                    location: inventoryobj2.location,
                    history: inventoryobj2.history
                }
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

        // return 200;
    }

    public async getInventory(): Promise<any | null> {
        const inventoryobj = await InventoryModel.find();
        const myInventory = [];

        for await (const obj of inventoryobj) {
            myInventory.push({
                id: obj.id,
                createdAt: obj.createdAt.toISOString().slice(0, 10),
                seller: (await SellerModel.findOne({ id: obj.seller_id })).name,
                depot: (await DepotModel.findOne({ id: obj.depot_id })).name,
                product: (await ProductModel.findOne({ id: obj.product_id })).name,
                quantity: obj.quantity,
                history: obj.history
            });
        }

        return myInventory;
    }

    public async editInventoryObj(inventoryObj: InventoryEntity, queryId: string): Promise<any | null> {

        return await InventoryModel.updateOne({ id: queryId }, {
            $set: {
                seller_id: inventoryObj.seller_id,
                product_id: inventoryObj.product_id,
                quantity: inventoryObj.quantity,
                depot_id: inventoryObj.depot_id,
                history: inventoryObj.history
            }
        });
    }

    public async getRelatedDepots(seller_id: string): Promise<any | null> {
        const depotIds = await InventoryModel.find({ seller_id }, { depot_id: 1 });
        const relatedDepots = await DepotModel.find({ $and: [{ "id": { $in: depotIds.map((depot) => depot.depot_id) } }, { status: "active" }] });
        return relatedDepots
    }

    public async getProducts(depot_id: string, seller_id: string): Promise<any | null> {
        const invProducts = await InventoryModel.find({ depot_id, seller_id }, { product_id: 1, quantity: 1 });
        const myProducts = [];
        for await (const product of invProducts) {
            const currentProduct = await ProductModel.findOne({ id: product.product_id });
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
        return myProducts;
    }

    public async subtractAmount(product_ids, depot_id, date, transacction_type): Promise<any | null> {
        for await (const product of product_ids) {

            const currentInventory = await InventoryModel.findOne({ product_id: product.id, depot_id });
            const currentHistory = currentInventory.history;
            currentHistory.push({
                date,
                quantity: product.quantity,
                transaccion_type: transacction_type
            });
            await InventoryModel.updateOne({ product_id: product.id, depot_id }, {
                $set: {
                    quantity: currentInventory.quantity + product.quantity,
                    history: currentHistory
                }
            });
        }
        return 200;
    }

}