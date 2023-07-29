var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ZoneModel } from "../model/zone.schema";
import { ZoneValue } from "../../domain/zone.value";
export class MongoRepository {
    setDefaultZones() {
        return __awaiter(this, void 0, void 0, function* () {
            const zonesToInsert = [
                new ZoneValue({ name: "Norte 1", codes: [760001, 760002, 760003, 760004, 760006, 760046, 760050], cityId: "1009" }),
                new ZoneValue({ name: "Ladera 1", codes: [760044, 760045, 760009], cityId: "1009" }),
                new ZoneValue({ name: "Ladera 2", codes: [760008], cityId: "1009" }),
                new ZoneValue({ name: "Oriente 1", codes: [760010, 760011, 760012, 760013, 760014], cityId: "1009" }),
                new ZoneValue({ name: "Oriente 2", codes: [760015, 760016, 760020, 760021, 760022, 760023, 760024, 760025], cityId: "1009" }),
                new ZoneValue({ name: "Oriente 3", codes: [760026, 760007, 760030, 760031, 760032], cityId: "1009" }),
                new ZoneValue({ name: "Oeste - Centro", codes: [760040, 760041, 760042, 760043], cityId: "1009" }),
                new ZoneValue({ name: "Sur", codes: [760033, 760034, 760035, 760036], cityId: "1009" })
            ];
            const zones = yield ZoneModel.create(zonesToInsert);
            return zones;
        });
    }
    getZones() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ZoneModel.find();
        });
    }
    createZone(name, codes) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ZoneModel.create({ name, codes });
        });
    }
    setZone(oldName, name, codes) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ZoneModel.updateOne({ name: oldName }, { $set: { name, codes } });
        });
    }
}
