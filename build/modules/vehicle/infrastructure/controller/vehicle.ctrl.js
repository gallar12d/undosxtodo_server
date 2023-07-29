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
import { VehicleValue } from "../../domain/vehicle.value";
export class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
        this.createVehicle = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, dealer_id, zone_id, capacity, name, phone, email, description, depot_id, picture, vehicle_type, status, availability } = body;
                const newVehicle = new VehicleValue({
                    code, dealer_id, zone_id, capacity, name, phone, email, description, depot_id, picture, vehicle_type, status, availability
                });
                res.status(200).json(yield this.vehicleService.createVehicle(newVehicle));
            }
            catch (err) {
                err.message = err.response.data.errors;
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.changeVehicleStatus = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { vehicle_id, status } = body;
                res.status(200).json(yield this.vehicleService.changeVehicleStatus(vehicle_id, status));
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
        this.getVehicles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield this.vehicleService.getVehicles());
            }
            catch (err) {
                res.status(400).json(getErrorMessage(err));
            }
        });
    }
}
