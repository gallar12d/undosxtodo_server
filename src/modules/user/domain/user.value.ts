import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserValue implements UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.id = uuid();
    this.name = name;
    this.email = email.toLowerCase();
    this.password = password;
  }

  public encript = (encriptedPaswword): void => {
    this.password = encriptedPaswword;
  };
}
