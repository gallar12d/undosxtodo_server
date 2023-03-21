import { Router } from "express";
import { OrderService } from "../../application/OrderService";
import { OrderController } from "../controller/order.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const orderService = new OrderService(mongoRepository);
const orderCtrl = new OrderController(orderService);

router.get(`/order/:id`, authMiddleware, orderCtrl.findOrder);
router.get(`/order`, authMiddleware, orderCtrl.allOrder);
router.post(`/order`, authMiddleware, orderCtrl.registerOrder);
router.put(`/order/:id`, authMiddleware, orderCtrl.updateOrder);
router.post(`/status`, authMiddleware, orderCtrl.insertStatus);
router.put(`/status`, authMiddleware, orderCtrl.updateStatus);

export { router };