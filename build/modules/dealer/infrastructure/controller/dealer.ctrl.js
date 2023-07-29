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
import { DealerValue } from "../../domain/dealer.value";
export class DealerController {
    constructor(dealerService) {
        this.dealerService = dealerService;
        this.createDealer = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ruta99_id, name, phone_number, email, identification, role, password, rfc, driver_license, status } = body;
                const newDealer = new DealerValue({
                    ruta99_id, name, phone_number, email, identification, role, password, rfc, driver_license, status
                });
                res.status(200).json(yield this.dealerService.createDealer(newDealer));
            }
            catch (err) {
                err.message = err.response.data.errors;
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.changeStatus = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { dealer_id, status } = body;
                res.status(200).json(yield this.dealerService.changeStatus(dealer_id, status));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.getDealers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield this.dealerService.getDealers());
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
    }
}
