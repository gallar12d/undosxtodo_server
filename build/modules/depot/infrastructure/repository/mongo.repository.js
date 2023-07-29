var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { DepotModel } from "../model/depot.schema";
import { SellerModel } from '../../../seller/infrastructure/model/seller.schema';
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import mongoose from "mongoose";
import axios from 'axios';
export class MongoRepository {
    insertDepot(depot) {
        return __awaiter(this, void 0, void 0, function* () {
            // const insertedDepot = await DepotModel.create(depot);
            // return insertedDepot;
            try {
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
                const resDepot = yield axios.post(`https://api.ruta99.co/v1/depot`, depot, {
                    headers: {
                        Authorization: `Bearer ${this.tokenR99}`
                    }
                });
                if (resDepot.status === 201) {
                    depot.ruta99_id = resDepot.data.depot.id;
                    const insertedDepot = yield DepotModel.create(depot);
                    // const depots = await axios.get(`https://api.ruta99.co/v1/depot`, {
                    //     headers: {
                    //         Authorization: `Bearer ${this.tokenR99}`
                    //     }
                    // });
                    // console.log(depots.data.data);
                    return insertedDepot;
                }
                else {
                    return 400;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    getDepotsPage(seller_id, pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 6,
                sort: { createdAt: -1 }
            };
            // const depots:any = await DepotModel.paginate({ "seller_id": new mongoose.Types.ObjectId( seller_id ) }, options);
            const depots = yield DepotModel.paginate({ $and: [{ "seller_id": new mongoose.Types.ObjectId(seller_id) }, { status: "active" }] }, options);
            return depots;
        });
    }
    getDepots(seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const depots: DepotValue[] = await DepotModel.find({ "seller_id": seller_id }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status:1 });
            const depots = yield DepotModel.find({ $and: [{ "seller_id": seller_id }, { status: "active" }] }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1, status: 1, ruta99_id: 1 });
            return depots;
        });
    }
    updateDepot({ id, seller_id, name, state, city, address, status, ruta99_id, latitude, longitude }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const updatedDepot = await DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status });
            // return updatedDepot;
            try {
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
                if (status === "inactive") {
                    const resDepot = yield axios.delete(`https://api.ruta99.co/v1/depot/${ruta99_id}`, {
                        headers: {
                            Authorization: `Bearer ${this.tokenR99}`
                        }
                    });
                    if (resDepot.status === 200) {
                        const updatedDepot = yield DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status, ruta99_id, latitude, longitude });
                        return updatedDepot;
                    }
                    else {
                        return 400;
                    }
                }
                else {
                    const resDepot = yield axios.put(`https://api.ruta99.co/v1/depot/${ruta99_id}`, {
                        code: id, name, address, latitude, longitude
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.tokenR99}`
                        }
                    });
                    if (resDepot.status === 200) {
                        const updatedDepot = yield DepotModel.updateOne({ "id": `${id}` }, { seller_id, name, state, city, address, status, ruta99_id, latitude, longitude });
                        return updatedDepot;
                    }
                    else {
                        return 400;
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteDepot(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedDepot = yield DepotModel.deleteOne({ "id": id });
            return deletedDepot;
        });
    }
    allDepots(pag) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 10,
                sort: { createdAt: -1 }
            };
            var result = yield DepotModel.paginate({}, options);
            const depots = JSON.parse(JSON.stringify(result));
            try {
                for (var _d = true, _e = __asyncValues(depots.docs), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        var depot = _c;
                        depot.seller = (yield SellerModel.findOne({ _id: depot.seller_id })).name;
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return depots;
        });
    }
}
