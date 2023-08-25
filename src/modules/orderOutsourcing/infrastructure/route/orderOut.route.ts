import { Router } from "express";
import { OrderService } from "../../application/OrderOutService";
import { OrderController } from "../controller/orderOut.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const orderService = new OrderService(mongoRepository);
const orderCtrl = new OrderController(orderService);

router.post(`/outsourcingOrder`, authMiddleware, orderCtrl.registerOrder);
router.post(`/getsourcingOrders`, authMiddleware, orderCtrl.getOrdersPage);
router.post(`/setOrderStatus`, authMiddleware, orderCtrl.setOrderStatus);

export { router };