import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export class UserValue implements UserEntity {
  id: string;
  seller_id: ObjectId;
  name: string;
  email: string;
  password: string;
  rol: string;
  status:string;

  constructor({
    seller_id,
    name,
    email,
    password,
    rol,
    status
  }: {
    seller_id: ObjectId;
    name: string;
    email: string;
    password: string;
    rol: string;
    status:string
  }) {
    this.id = uuid();
    this.seller_id= seller_id;
    this.name = name;
    this.email = email.toLowerCase();
    this.password = password;
    this.rol= rol;
    this.status= status;
  }

  public encript = (encriptedPaswword): void => {
    this.password = encriptedPaswword;
  };
}
