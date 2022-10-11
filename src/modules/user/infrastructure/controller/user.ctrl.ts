import { request, response } from "express";
import { UserService } from "../../application/UserService";

export class UserController {
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
    const exist = await this.userService.userExist(req.body.email);
    if (exist) return res.status(400).send("User already exist");
    const user = await this.userService.registerUser(req.body);
    res.send(user);
  };
}
