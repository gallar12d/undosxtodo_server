import { request, response } from "express";
import { decode } from "querystring";
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

  public updateUser= async ({body},res) =>{
    const {id}= body;
    const {email}= body;
    const userUpdated= await this.userService.updateUser(id, email);
    res.send(userUpdated);
  }

  public returnToken= async( req, res )=>{
    res.status(200).send(req.token);
  }
}
