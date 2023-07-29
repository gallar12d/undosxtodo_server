var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VehicleModel } from "../model/vehicle.schema";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { DealerModel } from "../../../dealer/infrastructure/model/dealer.schema";
export class MongoRepository {
    constructor() {
        this.authBody = {
            "grant_type": "client_credentials",
            "client_id": "1007",
            "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
        };
    }
    createVehicle(newVehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tokenR99) {
                const token = yield axios.post(`https://api.ruta99.co/oauth/token`, this.authBody);
                this.tokenR99 = token.data.access_token;
            }
            else {
                const decoded = jwt.decode(this.tokenR99);
                if (!decoded || !decoded.exp) {
                    return true; // El token no es válido o no tiene fecha de expiración
                }
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTimestamp) {
                    const token = yield axios.post(`https://api.ruta99.co/oauth/token`, this.authBody);
                    this.tokenR99 = token.data.access_token;
                }
            }
            const dealerId = yield DealerModel.findOne({ id: newVehicle.dealer_id });
            const resVehicle = yield axios.post(`https://api.ruta99.co/v1/vehicle`, {
                code: newVehicle.code,
                capacity: newVehicle.capacity,
                name: newVehicle.name,
                user_id: dealerId.ruta99_id,
                depot_id: newVehicle.depot_id ? newVehicle.depot_id : null,
                vehicle_type: newVehicle.vehicle_type
            }, {
                headers: {
                    Authorization: `Bearer ${this.tokenR99}`
                }
            });
            if (resVehicle.status === 201) {
                newVehicle.ruta99_id = resVehicle.data.vehicle.id;
                const insertedVehicle = yield VehicleModel.create(newVehicle);
                return insertedVehicle;
            }
            else {
                return 400;
            }
        });
    }
    changeVehicleStatus(vehicle_id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedVehicle = yield VehicleModel.updateOne({ id: vehicle_id }, {
                    $set: {
                        status: newStatus
                    }
                });
                return updatedVehicle;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicles = yield VehicleModel.find({}, { id: 1, name: 1, code: 1, status: 1, availability: 1 });
                return vehicles;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
