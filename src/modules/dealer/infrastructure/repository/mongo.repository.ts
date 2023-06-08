import mongoose from "mongoose";
import { DealerRepository } from "../../domain/dealer.repository";
import { DealerModel } from "../model/dealer.schema"

export class MongoRepository implements DealerRepository {

    public async createDealer(name: string, code: string, capacity: string, email: string, depot_ids: string): Promise<any | null> {
        return 200;
    }

    public async getDealers(): Promise<any | null> {
        return 200;
    }

}