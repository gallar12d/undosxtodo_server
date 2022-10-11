import { Router } from "express";
import { UserService } from "../../application/UserService";
import { UserController } from "../controller/user.ctrl";
import { MongoRepository } from "../repository/mongo.repository";
import { authMiddleware } from "../../../../infrastructure/middleware/auth.middleware";

const router = Router();

const mongoRepository = new MongoRepository();
const userService = new UserService(mongoRepository);
const userCtrl = new UserController(userService);
router.get(`/user/:id`, userCtrl.findUser);
router.get(`/user`, authMiddleware, userCtrl.allUser);
router.post(`/user`, userCtrl.registerUser);

export { router };
