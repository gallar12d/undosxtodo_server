import { VehicleEntity } from "../domain/vehicle.entity";
import { VehicleRepository } from "../domain/vehicle.repository"
import { VehicleValue } from "../domain/vehicle.value";

export class VehicleService {
    constructor(private readonly zoneRepository: VehicleRepository) { }

    public async getVehicles() {
        return this.zoneRepository.getVehicles();
    }

    public async changeVehicleStatus(vehicle_id: string, newStatus: string) {
        return this.zoneRepository.changeVehicleStatus(vehicle_id, newStatus);
    }

    public async createVehicle(newVehicle: VehicleValue) {
        return this.zoneRepository.createVehicle(newVehicle);
    }

}