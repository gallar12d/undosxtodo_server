import mongoose from "mongoose";
import { ZoneRepository } from "../../domain/zone.repository";
import { ZoneModel } from "../model/zone.schema"
import { ZoneValue } from "../../domain/zone.value";

export class MongoRepository implements ZoneRepository {
    public async setDefaultZones(): Promise<any | null> {
        const zonesToInsert = [
            new ZoneValue({ name: "Norte 1", codes: [760001, 760002, 760003, 760004, 760006, 760046, 760050], cityId: "1009" }),
            new ZoneValue({ name: "Norte 1", codes: [760001, 760002, 760003, 760004, 760006, 760046, 760050], cityId: "1009" }),
            new ZoneValue({ name: "Ladera 1", codes: [760044, 760045, 760009], cityId: "1009" }),
            new ZoneValue({ name: "Ladera 2", codes: [760008], cityId: "1009" }),
            new ZoneValue({ name: "Oriente 1", codes: [760010, 760011, 760012, 760013, 760014], cityId: "1009" }),
            new ZoneValue({ name: "Oriente 2", codes: [760015, 760016, 760020, 760021, 760022, 760023, 760024, 760025], cityId: "1009" }),
            new ZoneValue({ name: "Oriente 3", codes: [760026, 760007, 760030, 760031, 760032], cityId: "1009" }),
            new ZoneValue({ name: "Oeste - Centro", codes: [760040, 760041, 760042, 760043], cityId: "1009" }),
            new ZoneValue({ name: "Sur", codes: [760033, 760034, 760035, 760036], cityId: "1009" })
        ];
        const zones = await ZoneModel.create(zonesToInsert);
        return zones;
    }

    public async getZones(): Promise<any | null> {
        return await ZoneModel.find();
    }
    public async createZone(name: string, codes: any): Promise<any | null> {
        return await ZoneModel.create({ name, codes });
    }

    public async setZone(oldName: string, name: string, codes: any): Promise<any | null> {
        return await ZoneModel.updateOne({ name: oldName }, { $set: { name, codes } });
    }

}