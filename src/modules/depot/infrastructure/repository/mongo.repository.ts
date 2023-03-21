import { DepotValue } from "../../domain/depot.value";
import { DepotRepository } from "../../domain/depot.repository";
import DepotModel from "../model/depot.schema";
// import UserModel from "../../../user/infrastructure/model/user.shchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export class MongoRepository implements DepotRepository {

    public async  insertDepot(depot: DepotValue):Promise<any | null>{
        const insertedDepot = await DepotModel.create(depot);
        return insertedDepot;
    }

    public async  getDepots(seller_id):Promise<DepotValue[] | null>{
        const depots: DepotValue[] = await DepotModel.find({"seller_id": seller_id},{_id:1,id:1,name:1,city:1,state:1});
        return depots;
    }

    public async updateDepot({id, seller_id, name, state, city, address}: DepotValue): Promise <any | null>{

        const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, {seller_id, name, state, city, address});
        return updatedDepot;
    }

    public async deleteDepot(id: string): Promise <any | null>{
        const deletedDepot= await DepotModel.deleteOne({"id": id});
        return deletedDepot;
    }
}