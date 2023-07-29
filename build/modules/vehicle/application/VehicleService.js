var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class VehicleService {
    constructor(zoneRepository) {
        this.zoneRepository = zoneRepository;
    }
    getVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.zoneRepository.getVehicles();
        });
    }
    changeVehicleStatus(vehicle_id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.zoneRepository.changeVehicleStatus(vehicle_id, newStatus);
        });
    }
    createVehicle(newVehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.zoneRepository.createVehicle(newVehicle);
        });
    }
}
