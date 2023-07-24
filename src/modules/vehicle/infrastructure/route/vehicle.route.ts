import { Router } from "express";
import { VehicleService } from "../../application/VehicleService";
import { VehicleController } from "../controller/vehicle.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const vehicleService = new VehicleService(mongoRepository);
const vehicleCtrl = new VehicleController(vehicleService);

router.get(`/getVehicles`, authMiddleware, vehicleCtrl.getVehicles);
router.post(`/createVehicle`, authMiddleware, vehicleCtrl.createVehicle);
router.post(`/changeVehicleStatus`, authMiddleware, vehicleCtrl.changeVehicleStatus);

export { router };