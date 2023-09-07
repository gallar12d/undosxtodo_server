import mongoose from "mongoose";
import { DealerRepository } from "../../domain/dealer.repository";
import { DealerModel } from "../model/dealer.schema"
import { DealerEntity } from "../../domain/dealer.entity";
import axios from 'axios';
import jwt from "jsonwebtoken";

import Shipday from 'shipday/integration';
import CarrierRequest from 'shipday/integration/carrier/carrier.request';

export class MongoRepository implements DealerRepository {

    public tokenR99: string;
    private shipdayClient: Shipday;
    public constructor() {
        this.shipdayClient = new Shipday('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
    }

    public async createDealer(newDealer: DealerEntity): Promise<any | null> {

        if (newDealer.platform === 'Shipday') {
            const carrierInfo = new CarrierRequest(newDealer.name, newDealer.email, '+57' + newDealer.phone_number);

            const carrierReq = await this.shipdayClient.carrierService.addCarrier(carrierInfo);
            if (!!carrierReq) {
                const carriers = await this.shipdayClient.carrierService.getCarriers();
                // const carrierIndex = carriers.findIndex((carrier: any) => carrier.name === newDealer.name);
                newDealer.shipday_id = carriers[carriers.length - 1].id;
                return await DealerModel.create(newDealer);
            }
        } else {
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
        }

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
        const dealers = await DealerModel.find({}, { id: 1, name: 1, identification: 1, phone_number: 1, status: 1, platform: 1 });
        return dealers;
    }

}