"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var DealerService_1 = require("../../application/DealerService");
var dealer_ctrl_1 = require("../controller/dealer.ctrl");
var mongo_repository_1 = require("../repository/mongo.repository");
var auth_middleware_1 = require("../../../../infrastructure/middleware/auth.middleware");
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var dealerService = new DealerService_1.DealerService(mongoRepository);
var dealerCtrl = new dealer_ctrl_1.DealerController(dealerService);
router.get("/getDealers", auth_middleware_1.authMiddleware, dealerCtrl.getDealers);
router.post("/createDealer", auth_middleware_1.authMiddleware, dealerCtrl.createDealer);
