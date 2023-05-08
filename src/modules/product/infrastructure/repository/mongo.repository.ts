import { ProductValue } from "../../domain/product.value";
import { ProductRepository } from "../../domain/product.repository";
import { ProductModel } from "../model/product.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";
import mongoose from "mongoose";
import { SellerModel } from "../../../seller/infrastructure/model/seller.schema";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import mongoose from "mongoose";

export class MongoRepository implements ProductRepository {

    public async insertProduct(newProduct: ProductValue): Promise<any | null> {
        const insertedProduct = await ProductModel.create(newProduct);
        return insertedProduct;
    }

    public async getProducts(depots_ids: any): Promise<any | null> {

        var products: any[] = [];
        var result: any[] = [];

        for await (const depot_id of depots_ids) {
            result = await ProductModel.find({ "depots_ids": { $all: [`${depot_id._id}`] } }, { id: 1, name: 1, price: 1, depots_ids: 1, status: 1 });
            products = products.concat(result.map(r => r));
        }

        let hash = {};
        products = products.filter((product: any) => hash[product._id] ? false : hash[product._id] = true);

        for await (const product of products) {
            product.depots_ids = await Promise.all(product.depots_ids.map(async (depot_id) => {
                return await DepotModel.findOne({ _id: depot_id }, { name: 1 });
            }));
        }

        return products;
    }

    public async getProductsPage(depots_ids: any, pag: number): Promise<any | null> {
        const options = {
            page: pag,
            limit: 6,
            sort: { createdAt: -1 }
        }

        // var products: any = [];
        var result: any = [];

        // for await (const depot_id of depots_ids) {
        //     result = await ProductModel.find({ "depots_ids": { $all: [`${depot_id._id}`] } }, { id: 1, name: 1, price: 1, depots_ids: 1, status: 1 });
        //     products = products.concat(result.map(r => r));
        // }

        // result = await ProductModel.paginate({ "depots_ids": { $in: depots_ids.map((d) => d._id) } }, options);
        result = await ProductModel.paginate({ $and: [{ "depots_ids": { $in: depots_ids.map((d) => d._id) } }, { status: "active" }] }, options);
        // console.log(result);
        // products = products.concat(result.docs.map(r => r));

        let hash = {};
        result.docs = result.docs.filter((product: any) => hash[product._id] ? false : hash[product._id] = true);

        for await (const product of result.docs) {
            product.depots_ids = await Promise.all(product.depots_ids.map(async (depot_id) => {
                return await DepotModel.findOne({ _id: depot_id }, { name: 1 });
            }));
        }

        return result;
    }

    public async updateProduct({ _id, id, depots_ids, sku, name, price, status }: any): Promise<any | null> {
        const updatedProduct = await ProductModel.updateOne({ _id: new mongoose.Types.ObjectId(_id) },
            { $set: { depots_ids: depots_ids, sku: sku, name: name, price: price, status: status } });
        return updatedProduct;
    }

    public async deleteProduct(_id): Promise<any | null> {
        const deletedProduct = await ProductModel.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
        return deletedProduct;
    }

    public async allProducts(pag): Promise<any | null> {
        const options = {
            page: pag,
            limit: 7,
            sort: { createdAt: -1 }
        }
        var result = await ProductModel.paginate({}, options);
        const products = JSON.parse(JSON.stringify(result));

        for await (var product of products.docs) {
            product.depots_ids = await Promise.all(product.depots_ids.map(async (depot_id) => {
                const depot = await DepotModel.findOne({ _id: depot_id }, { name: 1, seller_id: 1 });
                product.seller = (await SellerModel.findOne({ _id: depot.seller_id })).name;
                return depot;
            }));
        }

        return products;
    }
}