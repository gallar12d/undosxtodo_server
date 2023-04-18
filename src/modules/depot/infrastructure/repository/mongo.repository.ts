import { DepotValue } from "../../domain/depot.value";
import { DepotRepository } from "../../domain/depot.repository";
const DepotModel = require("../model/depot.schema");
import SellerModel from '../../../seller/infrastructure/model/seller.schema';
// import UserModel from "../../../user/infrastructure/model/user.shchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export class MongoRepository implements DepotRepository {

    public async insertDepot(depot: DepotValue): Promise<any | null> {
        const insertedDepot = await DepotModel.create(depot);
        return insertedDepot;
    }

    public async getDepots(seller_id): Promise<DepotValue[] | null> {
        console.log(DepotModel);
        const depots: DepotValue[] = await DepotModel.find({ "seller_id": seller_id }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1 });
        return depots;
    }

    public async updateDepot({ id, seller_id, name, state, city, address }: DepotValue): Promise<any | null> {

        const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address });
        return updatedDepot;
    }

    public async deleteDepot(id: string): Promise<any | null> {
        const deletedDepot = await DepotModel.deleteOne({ "id": id });
        return deletedDepot;
    }

    public async allDepots(pag: number): Promise<any> {
        const options = {
            page: pag,
            limit: 7
        }
        var result = await DepotModel.paginate({}, options);
        const depots = JSON.parse(JSON.stringify(result));

        for await (var depot of depots.docs) {
            depot.seller = (await SellerModel.findOne({ _id: depot.seller_id })).name;
        }

        return depots;
    }
}