import mongoose from "mongoose";
import { VehicleRepository } from "../../domain/vehicle.repository";
import { VehicleModel } from "../model/vehicle.schema"
import { VehicleEntity } from "../../domain/vehicle.entity";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { VehicleValue } from "../../domain/vehicle.value";
import { DealerModel } from "../../../dealer/infrastructure/model/dealer.schema";
import { DepotModel } from "../../../depot/infrastructure/model/depot.schema";

export class MongoRepository implements VehicleRepository {

    public tokenR99: string;
    public readonly authBody = {
        "grant_type": "client_credentials",
        "client_id": "1007",
        "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
    };
    public async createVehicle(newVehicle: VehicleValue): Promise<any | null> {
        if (!this.tokenR99) {
            const token = await axios.post(`https://api.ruta99.co/oauth/token`, this.authBody);
            this.tokenR99 = token.data.access_token;

        } else {
            const decoded = jwt.decode(this.tokenR99);
            if (!decoded || !decoded.exp) {
                return true; // El token no es válido o no tiene fecha de expiración
            }
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTimestamp) {
                const token = await axios.post(`https://api.ruta99.co/oauth/token`, this.authBody);
                this.tokenR99 = token.data.access_token;
            }
        }

        const dealerId = await DealerModel.findOne({ id: newVehicle.dealer_id });

        const resVehicle = await axios.post(`https://api.ruta99.co/v1/vehicle`, {
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
            const insertedVehicle = await VehicleModel.create(newVehicle);
            return insertedVehicle;
        } else {
            return 400;
        }

    }
    public async changeVehicleStatus(vehicle_id: string, newStatus: string): Promise<any | null> {
        try {
            const updatedVehicle = await VehicleModel.updateOne({ id: vehicle_id }, {
                $set: {
                    status: newStatus
                }
            });
            return updatedVehicle;
        } catch (error) {
            console.log(error);
        }
    }
    public async getVehicles(): Promise<any | null> {
        try {
            const vehicles = await VehicleModel.find({}, { id: 1, name: 1, code: 1, status: 1, availability: 1 });
            return vehicles;
        } catch (error) {
            console.log(error);
        }
    }
}