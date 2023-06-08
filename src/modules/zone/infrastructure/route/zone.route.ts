import { Router } from "express";
import { ZoneService } from "../../application/ZoneService";
import { ZoneController } from "../controller/zone.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const zoneService = new ZoneService(mongoRepository);
const zoneCtrl = new ZoneController(zoneService);

router.post(`/setDefaultZones`, authMiddleware, zoneCtrl.setDefaultZones);
router.get(`/getZones`, authMiddleware, zoneCtrl.getZones);
router.post(`/createZone`, authMiddleware, zoneCtrl.createZone);
router.put(`/setZone`, authMiddleware, zoneCtrl.setZone);

export { router };