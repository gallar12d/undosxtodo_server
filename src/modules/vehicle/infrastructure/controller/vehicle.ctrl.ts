import { Request, Response } from "express";
import getErrorMessage from "../../../../infrastructure/utils/handleErrors";
import { VehicleService } from "../../application/VehicleService";
import { VehicleValue } from "../../domain/vehicle.value";

export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    public createVehicle = async ({ body }: Request, res: Response) => {
        try {
            const { code, dealer_id, zone_id, capacity, name, phone, email, description, depot_id, picture, vehicle_type, status, availability } = body;

            const newVehicle = new VehicleValue({
                code, dealer_id, zone_id, capacity, name, phone, email, description, depot_id, picture, vehicle_type, status, availability
            });
            res.status(200).json(await this.vehicleService.createVehicle(newVehicle));
        } catch (err) {
            err.message = err.response.data.errors;
            res.status(400).json(getErrorMessage(err));
        }
    }

    public changeVehicleStatus = async ({ body }: Request, res: Response) => {
        try {
            const { vehicle_id, status } = body;
            res.status(200).json(await this.vehicleService.changeVehicleStatus(vehicle_id, status));
        } catch (err) {
            res.status(400).json(getErrorMessage(err));
        }
    }

    public getVehicles = async (req: Request, res: Response) => {
        try {
            res.status(200).json(await this.vehicleService.getVehicles());
        } catch (err) {
            res.status(400).json(getErrorMessage(err));
        }
    }
}