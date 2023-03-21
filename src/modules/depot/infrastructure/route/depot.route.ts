import { Router } from "express";
import { DepotService } from "../../application/DepotService";
import { DepotController } from "../controller/depot.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
// import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";
// const { body, check } = require("express-validator");

const router = Router();

const mongoRepository = new MongoRepository();
const depotService = new DepotService(mongoRepository);
const depotCtrl = new DepotController(depotService);
router.post(`/depot`,depotCtrl.insertDepot);
router.post(`/depots`,depotCtrl.getDepots);
router.put(`/depot`,depotCtrl.updateDepot);
router.delete(`/depot/:id`,depotCtrl.deleteDepot);

export { router };