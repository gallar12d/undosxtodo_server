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
export class ZoneController {
    constructor(zoneService) {
        this.zoneService = zoneService;
        this.setDefaultZones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send(yield this.zoneService.setDefaultZones());
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.createZone = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, codes } = body;
                const arrayCodes = codes.map((objeto) => objeto.value);
                res.status(200).send(yield this.zoneService.createZone(name, arrayCodes));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.getZones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send(yield this.zoneService.getZones());
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
        this.setZone = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldName, name, codes } = body;
                const arrayCodes = codes.map((objeto) => objeto.value);
                res.status(200).send(yield this.zoneService.setZone(oldName, name, arrayCodes));
            }
            catch (err) {
                res.status(400).send(getErrorMessage(err));
            }
        });
    }
}
