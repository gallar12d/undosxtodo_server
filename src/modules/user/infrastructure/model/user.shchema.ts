import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: { type: String},
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);
const UserModel = model("users", UserSchema);
export default UserModel;
