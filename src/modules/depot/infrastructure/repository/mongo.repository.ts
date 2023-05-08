import { DepotValue } from "../../domain/depot.value";
import { DepotRepository } from "../../domain/depot.repository";
import { DepotModel } from "../model/depot.schema";
import { SellerModel } from '../../../seller/infrastructure/model/seller.schema';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export class MongoRepository implements DepotRepository {

    public async insertDepot(depot: DepotValue): Promise<any | null> {
        const insertedDepot = await DepotModel.create(depot);
        return insertedDepot;
    }

    public async getDepotsPage(seller_id, pag): Promise<any[] | null> {
        const options = {
            page: pag,
            limit: 6,
            sort: { createdAt: -1 }
        }
        // const depots:any = await DepotModel.paginate({ "seller_id": new mongoose.Types.ObjectId( seller_id ) }, options);
        const depots: any = await DepotModel.paginate({ $and: [{ "seller_id": new mongoose.Types.ObjectId(seller_id) }, { status: "active" }] }, options);
        return depots;
    }

    public async getDepots(seller_id): Promise<DepotValue[] | null> {
        // const depots: DepotValue[] = await DepotModel.find({ "seller_id": seller_id }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status:1 });
        const depots: DepotValue[] = await DepotModel.find({ $and: [{ "seller_id": seller_id }, { status: "active" }] }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status: 1 });
        return depots;
    }

    public async updateDepot({ id, seller_id, name, state, city, address, status }: DepotValue): Promise<any | null> {

        const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status });
        return updatedDepot;
    }

    public async deleteDepot(id: string): Promise<any | null> {
        const deletedDepot = await DepotModel.deleteOne({ "id": id });
        return deletedDepot;
    }

    public async allDepots(pag: number): Promise<any> {
        const options = {
            page: pag,
            limit: 10,
            sort: { createdAt: -1 }
        }
        var result = await DepotModel.paginate({}, options);
        const depots = JSON.parse(JSON.stringify(result));

        for await (var depot of depots.docs) {
            depot.seller = (await SellerModel.findOne({ _id: depot.seller_id })).name;
        }

        return depots;
    }
}