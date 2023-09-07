"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var OrderOutService_1 = require("../../application/OrderOutService");
var orderOut_ctrl_1 = require("../controller/orderOut.ctrl");
var mongo_repository_1 = require("../repository/mongo.repository");
var auth_middleware_1 = require("../../../../infrastructure/middleware/auth.middleware");
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var orderService = new OrderOutService_1.OrderService(mongoRepository);
var orderCtrl = new orderOut_ctrl_1.OrderController(orderService);
router.post("/outsourcingOrder", auth_middleware_1.authMiddleware, orderCtrl.registerOrder);
router.post("/getOutSourcingOrders", auth_middleware_1.authMiddleware, orderCtrl.getOrdersPage);
router.get("/getOutSourcingOrders/:pag", auth_middleware_1.authMiddleware, orderCtrl.allOutOrders);
router.post("/getOrderOutDate", auth_middleware_1.authMiddleware, orderCtrl.getOrderOutDate);
router.post("/recentOutOrders", auth_middleware_1.authMiddleware, orderCtrl.recentOutOrders);
router.post("/setOrderStatus", orderCtrl.setOrderStatus);
router.post("/getOrderOutsourcing", auth_middleware_1.authMiddleware, orderCtrl.getOrderOutsourcing);
router.get("/getOutDrivers", auth_middleware_1.authMiddleware, orderCtrl.getOutDrivers);
