var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SellerService {
    constructor(sellerRepository) {
        this.sellerRepository = sellerRepository;
    }
    getSeller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield this.sellerRepository.getSeller(id);
            return seller;
        });
    }
    getAllSellers(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield this.sellerRepository.getAllSellers(pag);
            return seller;
        });
    }
    createSeller(newSeller) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellerCreated = yield this.sellerRepository.createSeller(newSeller);
            return sellerCreated;
        });
    }
    updateSeller(sellerToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellerUpdated = yield this.sellerRepository.updateSeller(sellerToUpdate);
            return sellerUpdated;
        });
    }
}
