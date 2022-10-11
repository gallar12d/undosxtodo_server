import { Router } from "express";
import { UserService } from "../../../user/application/UserService";
import { AuthController } from "../controller/auth.ctrl";
import { MongoRepository } from "../../../user/infrastructure/repository/mongo.repository";
const { body, validationResult, check } = require("express-validator");

const router = Router();

const mongoRepository = new MongoRepository();
const userService = new UserService(mongoRepository);
const authCtrl = new AuthController(userService);
router.post(`/auth/login`, authCtrl.loginUser);
router.post(
  `/auth/register`,
  body("email").isEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  authCtrl.registerUser
);

export { router };
