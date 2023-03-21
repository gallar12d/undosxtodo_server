"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var user_route_1 = require("../../modules/user/infrastructure/route/user.route");
var auth_route_1 = require("../../modules/auth/infrastructure/route/auth.route");
var order_route_1 = require("../../modules/order/infrastructure/route/order.route");
var seller_route_1 = require("../../modules/seller/infrastructure/route/seller.route");
var state_route_1 = require("../../modules/state/infrastructure/route/state.route");
var depot_route_1 = require("../../modules/depot/infrastructure/route/depot.route");
var product_route_1 = require("../../modules/product/infrastructure/route/product.route");
var router = (0, express_1.Router)();
exports.router = router;
router.use(user_route_1.router);
router.use(auth_route_1.router);
router.use(order_route_1.router);
router.use(seller_route_1.router);
router.use(state_route_1.router);
router.use(depot_route_1.router);
router.use(product_route_1.router);
