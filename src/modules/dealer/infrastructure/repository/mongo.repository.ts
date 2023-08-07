import mongoose from "mongoose";
import { DealerRepository } from "../../domain/dealer.repository";
import { DealerModel } from "../model/dealer.schema"
import { DealerEntity } from "../../domain/dealer.entity";
import axios from 'axios';
import jwt from "jsonwebtoken";

export class MongoRepository implements DealerRepository {

    public tokenR99: string;
    public async createDealer(newDealer: DealerEntity): Promise<any | null> {

        // try {
        if (!this.tokenR99) {
            const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
                "grant_type": "client_credentials",
                "client_id": "1007",
                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
            });

            this.tokenR99 = token.data.access_token;

        } else {
            const decoded: any = jwt.decode(this.tokenR99);
            if (!decoded || !decoded.exp) {
                return true; // El token no es válido o no tiene fecha de expiración
            }
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTimestamp) {
                const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
                    "grant_type": "client_credentials",
                    "client_id": "1007",
                    "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                });

                this.tokenR99 = token.data.access_token;
            }
        }

        const reqDealer = await axios.post(`https://api.ruta99.co/v1/user`, newDealer, {
            headers: {
                Authorization: `Bearer ${this.tokenR99}`
            }
        });

        if (reqDealer.status === 201) {
            newDealer.ruta99_id = reqDealer.data.user.id;
            const myNewDealer = await DealerModel.create(newDealer);
            return myNewDealer;
        } else {
            return 400;
        }

        // } catch (error) {
        //     const message = error.response.data.errors;
        //     throw new Error(message);
        // }

    }

    public async changeStatus(dealer_id: string, newStatus: string): Promise<any | null> {
        const updatedDealer = await DealerModel.updateOne({ id: dealer_id }, {
            $set: {
                status: newStatus
            }
        });
        return updatedDealer;
    }

    public async getDealers(): Promise<any | null> {
        const dealers = await DealerModel.find({}, { id: 1, name: 1, identification: 1, phone_number: 1, status: 1 });
        return dealers;
    }

}