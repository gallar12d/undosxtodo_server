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
router.post(`/ordersPage`, authMiddleware, orderCtrl.getOrdersPage);
router.put(`/order/:id`, authMiddleware, orderCtrl.updateOrder);
router.post(`/status`, authMiddleware, orderCtrl.insertStatus);
router.put(`/status`, authMiddleware, orderCtrl.updateStatus);
router.get(`/orders/:pag`, authMiddleware, orderCtrl.allOrders);
router.post(`/ordersDate`, authMiddleware, orderCtrl.ordersDate);
router.post(`/authR99`, authMiddleware, orderCtrl.authR99);
router.post(`/createScenario`, authMiddleware, orderCtrl.createScenario);
router.post(`/deleteScenario`, authMiddleware, orderCtrl.deleteScenario);
router.post(`/orderReports`,authMiddleware,orderCtrl.orderReports);
router.post(`/recentOrders`,authMiddleware,orderCtrl.recentOrders);
router.post(`/orderTraceability`,orderCtrl.orderTraceability);
// router.post(`/createScenario`, authMiddleware, orderCtrl.createScenario);

export { router };