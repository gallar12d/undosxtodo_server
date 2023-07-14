import { DepotValue } from "../../domain/depot.value";
import { DepotRepository } from "../../domain/depot.repository";
import { DepotModel } from "../model/depot.schema";
import { SellerModel } from '../../../seller/infrastructure/model/seller.schema';
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import mongoose from "mongoose";
import axios from 'axios';

export class MongoRepository implements DepotRepository {

    public tokenR99: string;

    public async insertDepot(depot: DepotValue): Promise<any | null> {
        // const insertedDepot = await DepotModel.create(depot);
        // return insertedDepot;

        try {
            if (!this.tokenR99) {
                const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
                    "grant_type": "client_credentials",
                    "client_id": "1007",
                    "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                });

                this.tokenR99 = token.data.access_token;

            } else {
                const decoded = jwt.decode(this.tokenR99);
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

            const resDepot = await axios.post(`https://api.ruta99.co/v1/depot`, depot, {
                headers: {
                    Authorization: `Bearer ${this.tokenR99}`
                }
            });

            if (resDepot.status === 201) {
                depot.ruta99_id = resDepot.data.depot.id;

                const insertedDepot = await DepotModel.create(depot);
                // const depots = await axios.get(`https://api.ruta99.co/v1/depot`, {
                //     headers: {
                //         Authorization: `Bearer ${this.tokenR99}`
                //     }
                // });

                // console.log(depots.data.data);
                return insertedDepot;
            } else {
                return 400;
            }

        } catch (error) {
            return error;
        }
    }

    public async getDepotsPage(seller_id, pag): Promise<any[] | null> {
        const options = {
            page: pag,
            limit: 6,
            sort: { createdAt: -1 }
        }
        // const depots:any = await DepotModel.paginate({ "seller_id": new mongoose.Types.ObjectId( seller_id ) }, options);
        const depots: any = await DepotModel.paginate({ $and: [{ "seller_id": new mongoose.Types.ObjectId(seller_id) }, { status: "active" }] }, options);
        return depots;
    }

    public async getDepots(seller_id): Promise<DepotValue[] | null> {
        // const depots: DepotValue[] = await DepotModel.find({ "seller_id": seller_id }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status:1 });
        const depots: DepotValue[] = await DepotModel.find({ $and: [{ "seller_id": seller_id }, { status: "active" }] }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status: 1 });
        return depots;
    }

    public async updateDepot({ id, seller_id, name, state, city, address, status, ruta99_id, latitude, longitude }: DepotValue): Promise<any | null> {

        // const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status });
        // return updatedDepot;

        try {
            if (!this.tokenR99) {
                const token = await axios.post(`https://api.ruta99.co/oauth/token`, {
                    "grant_type": "client_credentials",
                    "client_id": "1007",
                    "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                });

                this.tokenR99 = token.data.access_token;

            } else {
                const decoded = jwt.decode(this.tokenR99);
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
            
            if (status === "inactive") {
                const resDepot = await axios.delete(`https://api.ruta99.co/v1/depot/${ruta99_id}`, {
                    headers: {
                        Authorization: `Bearer ${this.tokenR99}`
                    }
                });
                if (resDepot.status === 200) {
                    const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status, ruta99_id, latitude, longitude });
                    return updatedDepot;
                } else {
                    return 400
                }
            } else {

                const resDepot = await axios.put(`https://api.ruta99.co/v1/depot/${ruta99_id}`, {
                    code: id, name, address, latitude, longitude
                }, {
                    headers: {
                        Authorization: `Bearer ${this.tokenR99}`
                    }
                });
                if (resDepot.status === 200) {
                    const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status, ruta99_id, latitude, longitude });
                    return updatedDepot;
                } else {
                    return 400
                }
            }


        } catch (error) {
            console.log(error);
        }
    }

    public async deleteDepot(id: string): Promise<any | null> {
        const deletedDepot = await DepotModel.deleteOne({ "id": id });
        return deletedDepot;
    }

    public async allDepots(pag: number): Promise<any> {
        const options = {
            page: pag,
            limit: 10,
            sort: { createdAt: -1 }
        }
        var result = await DepotModel.paginate({}, options);
        const depots = JSON.parse(JSON.stringify(result));

        for await (var depot of depots.docs) {
            depot.seller = (await SellerModel.findOne({ _id: depot.seller_id })).name;
        }

        return depots;
    }
}