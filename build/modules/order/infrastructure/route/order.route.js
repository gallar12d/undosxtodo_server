"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var OrderService_1 = require("../../application/OrderService");
var order_ctrl_1 = require("../controller/order.ctrl");
var mongo_repository_1 = require("../repository/mongo.repository");
var auth_middleware_1 = require("../../../../infrastructure/middleware/auth.middleware");
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var orderService = new OrderService_1.OrderService(mongoRepository);
var orderCtrl = new order_ctrl_1.OrderController(orderService);
router.get("/order/:id", auth_middleware_1.authMiddleware, orderCtrl.findOrder);
router.get("/order", auth_middleware_1.authMiddleware, orderCtrl.allOrder);
router.post("/order", auth_middleware_1.authMiddleware, orderCtrl.registerOrder);
router.put("/order/:id", auth_middleware_1.authMiddleware, orderCtrl.updateOrder);
router.post("/status", auth_middleware_1.authMiddleware, orderCtrl.insertStatus);
router.put("/status", auth_middleware_1.authMiddleware, orderCtrl.updateStatus);
router.get("/orders/:pag", auth_middleware_1.authMiddleware, orderCtrl.allOrders);
