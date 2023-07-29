var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DepotValue } from "../../domain/depot.value";
export class DepotController {
    constructor(depotService) {
        this.depotService = depotService;
        this.insertDepot = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { seller_id, name, state, city, latitude, longitude, address, status } = body;
            const newDepot = new DepotValue({
                seller_id, name, state, city, latitude, longitude, address, status
            });
            const insertedDepot = yield this.depotService.insertDepot(newDepot);
            res.send(insertedDepot);
        });
        this.getDepots = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { seller_id } = body;
            const depots = yield this.depotService.getDepots(seller_id);
            res.send(depots);
        });
        this.getDepotsPage = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { seller_id, pag } = body;
            const depots = yield this.depotService.getDepotsPage(seller_id, pag);
            res.send(depots);
        });
        this.updateDepot = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const updatedDepot = yield this.depotService.updateDepot(body);
            res.send(updatedDepot);
        });
        this.deleteDepot = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const depotDeleted = yield this.depotService.deleteDepot(id);
            res.send(depotDeleted);
        });
        this.allDepots = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { pag } = req.params;
            const depots = yield this.depotService.allDepots(pag);
            res.send(depots);
        });
    }
}
