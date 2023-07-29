var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SellerValue } from "../../domain/seller.value";
export class SellerController {
    constructor(sellerService) {
        this.sellerService = sellerService;
        this.getSeller = ({ token }, res) => __awaiter(this, void 0, void 0, function* () {
            const seller = yield this.sellerService.getSeller(token.id);
            res.send(seller);
        });
        this.getAllSellers = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            const { pag } = params;
            const sellers = yield this.sellerService.getAllSellers(pag);
            res.send(sellers);
        });
        this.createSeller = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, country, state, city, address, telephone, nit, postal_code, email } = body;
            const newSeller = new SellerValue({
                name,
                country,
                state,
                city,
                address,
                telephone,
                nit,
                postal_code,
                email
            });
            const sellerCreated = yield this.sellerService.createSeller(newSeller);
            res.send(sellerCreated);
        });
        this.updateSeller = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, name, country, state, city, address, telephone, nit, postal_code, email } = body;
            const sellerToUpdate = { id, name, country, state, city, address, telephone, nit, postal_code, email };
            const sellerUpdated = yield this.sellerService.updateSeller(sellerToUpdate);
            res.send(sellerUpdated);
        });
    }
}
