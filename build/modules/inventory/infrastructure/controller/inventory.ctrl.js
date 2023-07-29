var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { InventoryValue } from "../../domain/inventory.value";
export class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
        this.createInventoryObj = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { seller_id, product_id, quantity, depot_id, income_type, history, status } = body;
                const myInventory = new InventoryValue({ seller_id, product_id, quantity, depot_id, income_type, history, status });
                res.status(200).send(yield this.inventoryService.createInventoryObj(myInventory));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.editInventoryObj = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { seller_id, product_id, quantity, depot_id, income_type, queryId, status } = body;
                const inventoryObj = new InventoryValue({ seller_id, product_id, quantity, depot_id, income_type, status });
                res.status(200).send(yield this.inventoryService.editInventoryObj(inventoryObj, queryId));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.getInventory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send(yield this.inventoryService.getInventory());
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.getRelatedSellers = ({ params }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pag } = params;
                res.status(200).json(yield this.inventoryService.getRelatedSellers(parseInt(pag)));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.setInventoryStatus = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { seller_id, depots } = body;
                const theDepots = JSON.parse(depots);
                res.status(200).json(yield this.inventoryService.setInventoryStatus(seller_id, theDepots));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.getRelatedDepots = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { seller_id } = body;
                res.status(200).send(yield this.inventoryService.getRelatedDepots(seller_id));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.getProducts = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { depot_id, seller_id } = body;
                res.status(200).send(yield this.inventoryService.getProducts(depot_id, seller_id));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.subtractAmount = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_ids, depot_id, date, transacction_type } = body;
                res.status(200).send(yield this.inventoryService.subtractAmount(product_ids, depot_id, date, transacction_type));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
    }
}
