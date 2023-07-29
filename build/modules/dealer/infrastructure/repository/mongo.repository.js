var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DealerModel } from "../model/dealer.schema";
import axios from 'axios';
import jwt from "jsonwebtoken";
export class MongoRepository {
    createDealer(newDealer) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            if (!this.tokenR99) {
                const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                    "grant_type": "client_credentials",
                    "client_id": "1007",
                    "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                });
                this.tokenR99 = token.data.access_token;
            }
            else {
                const decoded = jwt.decode(this.tokenR99);
                if (!decoded || !decoded.exp) {
                    return true; // El token no es válido o no tiene fecha de expiración
                }
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTimestamp) {
                    const token = yield axios.post(`https://api.ruta99.co/oauth/token`, {
                        "grant_type": "client_credentials",
                        "client_id": "1007",
                        "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                    });
                    this.tokenR99 = token.data.access_token;
                }
            }
            const reqDealer = yield axios.post(`https://api.ruta99.co/v1/user`, newDealer, {
                headers: {
                    Authorization: `Bearer ${this.tokenR99}`
                }
            });
            if (reqDealer.status === 201) {
                newDealer.ruta99_id = reqDealer.data.user.id;
                const myNewDealer = yield DealerModel.create(newDealer);
                return myNewDealer;
            }
            else {
                return 400;
            }
            // } catch (error) {
            //     const message = error.response.data.errors;
            //     throw new Error(message);
            // }
        });
    }
    changeStatus(dealer_id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDealer = yield DealerModel.updateOne({ id: dealer_id }, {
                $set: {
                    status: newStatus
                }
            });
            return updatedDealer;
        });
    }
    getDealers() {
        return __awaiter(this, void 0, void 0, function* () {
            const dealers = yield DealerModel.find({}, { id: 1, name: 1, identification: 1, phone_number: 1, status: 1 });
            return dealers;
        });
    }
}
