"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var UserService_1 = require("../../../user/application/UserService");
var auth_ctrl_1 = require("../controller/auth.ctrl");
var mongo_repository_1 = require("../../../user/infrastructure/repository/mongo.repository");
var _a = require("express-validator"), body = _a.body, validationResult = _a.validationResult, check = _a.check;
var router = (0, express_1.Router)();
exports.router = router;
var mongoRepository = new mongo_repository_1.MongoRepository();
var userService = new UserService_1.UserService(mongoRepository);
var authCtrl = new auth_ctrl_1.AuthController(userService);
router.post("/auth/login", authCtrl.loginUser);
router.post("/auth/register", body("email").isEmail(), check("password")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"), authCtrl.registerUser);
