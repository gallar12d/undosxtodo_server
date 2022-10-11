import { Router } from "express";
import { OrderService } from "../../application/OrderService";
import { OrderController } from "../controller/order.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const orderService = new OrderService(mongoRepository);
const userCtrl = new OrderController(orderService);

router.get(`/order/:id`, authMiddleware, userCtrl.findOrder);
router.get(`/order`, authMiddleware, userCtrl.allOrder);
// router.get(`/order`, authMiddleware, userCtrl.allOrder);

router.post(`/order`, authMiddleware, userCtrl.registerOrder);

export { router };
