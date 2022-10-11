import { request, response } from "express";
import { UserService } from "../../../user/application/UserService";
const { body, validationResult } = require("express-validator");

export class AuthController {
  constructor(private userService: UserService) {}

  public findUser = async (req, res) => {
    const user = await this.userService.findUser(req.params.id);
    res.send(user);
  };

  public allUser = async (req, res) => {
    const users = await this.userService.allUser();
    res.send(users);
  };

  public registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exist = await this.userService.userExist(req.body.email);
    if (exist) return res.status(400).send("User already exist");
    const user = await this.userService.registerUser(req.body);
    res.send(user);
  };

  public loginUser = async (req, res) => {
    const user = await this.userService.loginUser(
      req.body.email,
      req.body.password
    );
    if (!user) return res.status(400).send("Invalid email or password");
    res.send(user);
  };
}
