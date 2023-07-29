var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class InventoryService {
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    createInventoryObj(myInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.createInventoryObj(myInventory);
        });
    }
    getInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.getInventory();
        });
    }
    editInventoryObj(inventoryObj, queryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.editInventoryObj(inventoryObj, queryId);
        });
    }
    getRelatedSellers(pag) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.getRelatedSellers(pag);
        });
    }
    setInventoryStatus(seller_id, depots) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.setInventoryStatus(seller_id, depots);
        });
    }
    getRelatedDepots(seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.getRelatedDepots(seller_id);
        });
    }
    getProducts(depot_id, seller_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.getProducts(depot_id, seller_id);
        });
    }
    subtractAmount(product_ids, depot_id, date, transacction_type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.subtractAmount(product_ids, depot_id, date, transacction_type);
        });
    }
}
