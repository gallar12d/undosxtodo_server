var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StateModel from "../model/state.schema";
import { states } from '../../../state/infrastructure/db/states';
import { cities } from '../db/cities';
import CityModel from '../model/city.schema';
export class MongoRepository {
    getStates() {
        return __awaiter(this, void 0, void 0, function* () {
            const states = yield StateModel.find();
            states.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return states;
        });
    }
    insertStatesAndCities() {
        return __awaiter(this, void 0, void 0, function* () {
            yield StateModel.insertMany(states);
            yield CityModel.insertMany(cities);
            return [];
        });
    }
    getCities(stateName) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultState = yield StateModel.find({ name: stateName });
            const cities = yield CityModel.find({ state_id: resultState[0].id });
            cities.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
            return cities;
        });
    }
}
