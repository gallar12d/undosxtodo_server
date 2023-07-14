import { VehicleEntity } from "./vehicle.entity";
import { VehicleValue } from "./vehicle.value";

export interface VehicleRepository {
    getVehicles(): Promise<VehicleEntity[] | any | null>;
    createVehicle(newVehicle: VehicleValue): Promise<VehicleEntity[] | any | null>;
    changeVehicleStatus(vehicle_id: string, newStatus: string): Promise<VehicleEntity[] | any | null>;
}