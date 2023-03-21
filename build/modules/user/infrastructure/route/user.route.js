"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var UserService_1 = require("../../application/UserService");
var user_ctrl_1 = require("../controller/user.ctrl");
var mongo_repository_1 = require("../repository/mongo.repository");
var auth_middleware_1 = require("../../../../infrastructure/middleware/auth.middleware");
var _a = require("express-validator"), body = _a.body, check = _a.check;
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var userService = new UserService_1.UserService(mongoRepository);
var userCtrl = new user_ctrl_1.UserController(userService);
router.get("/user/:id", userCtrl.findUser);
router.get("/user", auth_middleware_1.authMiddleware, userCtrl.allUser);
router.post("/user", userCtrl.registerUser);
router.put("/user", body("email").isEmail(), userCtrl.updateUser);
router.get("/userToken", auth_middleware_1.authMiddleware, userCtrl.returnToken);
