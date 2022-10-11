import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.respository";
import UserModel from "../model/user.shchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class MongoRepository implements UserRepository {
  public async findUser(id: string): Promise<any | null> {
    const user = await UserModel.findById(id);
    return user;
  }
  public async registerUser(user: UserEntity): Promise<any | null> {
    const userCreated = await UserModel.create(user);
    return userCreated;
  }

  public async allUser(): Promise<any[] | null> {
    const users = await UserModel.find();
    return users;
  }

  public createToken(id: string): string {
    const token = jwt.sign({ id }, process.env.SECRET_KEY || "secretkey", {
      expiresIn: "30m",
    });
    return token;
  }

  public async encriptPassword(password: string): Promise<string> {
    const encriptedPaswword = await bcrypt.hash(password, 10);
    return encriptedPaswword;
  }

  public async findUserByEmail(email: string): Promise<any | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }
  public async loginUser(email: string, password: string): Promise<any | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
