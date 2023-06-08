import { Router } from "express";
import { DealerService } from "../../application/DealerService";
import { DealerController } from "../controller/dealer.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const dealerService = new DealerService(mongoRepository);
const dealerCtrl = new DealerController(dealerService);

router.get(`/getDealers`, authMiddleware, dealerCtrl.getDealers);
router.post(`/createDealer`, authMiddleware, dealerCtrl.createDealer);

export { router };