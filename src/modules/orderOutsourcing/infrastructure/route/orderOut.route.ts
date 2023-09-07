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
router.post(`/getOutSourcingOrders`, authMiddleware, orderCtrl.getOrdersPage);
router.get(`/getOutSourcingOrders/:pag`, authMiddleware, orderCtrl.allOutOrders);
router.post(`/getOrderOutDate`, authMiddleware, orderCtrl.getOrderOutDate);
router.post(`/recentOutOrders`,authMiddleware,orderCtrl.recentOutOrders);
router.post(`/setOrderStatus`, orderCtrl.setOrderStatus);
router.post(`/getOrderOutsourcing`, authMiddleware, orderCtrl.getOrderOutsourcing);
router.get(`/getOutDrivers`, authMiddleware, orderCtrl.getOutDrivers);

export { router };