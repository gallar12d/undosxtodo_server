var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
const { body, validationResult } = require("express-validator");
export class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.findUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findUser(req.params.id);
            res.send(user);
        });
        this.allUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.allUser();
            res.send(users);
        });
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const exist = yield this.userService.userExist(req.body.email);
            if (exist)
                return res.status(400).send("User already exist");
            req.body.seller_id = new mongoose.Types.ObjectId(req.body.seller_id);
            const user = yield this.userService.registerUser(req.body);
            res.send(user);
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.loginUser(req.body.email, req.body.password);
            if (!user)
                return res.status(400).send("Invalid email or password");
            res.send(user);
        });
    }
}
