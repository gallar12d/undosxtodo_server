import { UserEntity } from "./user.entity";

export interface UserRepository {
  findUser(id: string): Promise<UserEntity | null>;
  registerUser(user: UserEntity): Promise<UserEntity | null>;
  loginUser(email: string, password: string): Promise<UserEntity | null>;
  allUser(): Promise<UserEntity[] | null>;
  createToken(id: string): string;
  encriptPassword(password: string): Promise<string>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  updateUser(id:string, email:string): Promise<string>;
}
