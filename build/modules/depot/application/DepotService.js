var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class DepotService {
    constructor(depotRepository) {
        this.depotRepository = depotRepository;
    }
    insertDepot(depot) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedDepot = yield this.depotRepository.insertDepot(depot);
            return insertedDepot;
        });
    }
    getDepots(seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const depots = yield this.depotRepository.getDepots(seller_id);
            return depots;
        });
    }
    getDepotsPage(seller_id, pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const depots = yield this.depotRepository.getDepotsPage(seller_id, pag);
            return depots;
        });
    }
    updateDepot(depot) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDepot = yield this.depotRepository.updateDepot(depot);
            return updatedDepot;
        });
    }
    deleteDepot(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedDepot = yield this.depotRepository.deleteDepot(id);
            return deletedDepot;
        });
    }
    allDepots(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            const depots = yield this.depotRepository.allDepots(pag);
            return depots;
        });
    }
}
