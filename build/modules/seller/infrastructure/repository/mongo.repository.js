var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SellerModel } from "../model/seller.schema";
import UserModel from "../../../user/infrastructure/model/user.shchema";
export class MongoRepository {
    getSeller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var seller_id = (yield UserModel.findOne({ "id": id })).seller_id;
            const seller = yield SellerModel.findOne({ _id: seller_id });
            return seller;
        });
    }
    getAllSellers(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: pag,
                limit: 6,
                sort: { createdAt: -1 }
            };
            const sellers = yield SellerModel.paginate({}, options);
            return sellers;
        });
    }
    createSeller(seller) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellerUpdated = yield SellerModel.create(seller);
            return sellerUpdated;
        });
    }
    updateSeller({ id, name, country, state, city, address, telephone, nit, postal_code, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            var seller_id = (yield UserModel.findOne({ "id": id })).seller_id;
            const sellerUpdated = yield SellerModel.updateOne({ "_id": `${seller_id}` }, { seller_id, name, country, state, city, address, telephone, nit, postal_code, email });
            return sellerUpdated;
        });
    }
}
