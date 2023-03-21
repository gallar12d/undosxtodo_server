import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: { type: String },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sellers',
    },
    name: String,
    email: String,
    password: String
  },
  { timestamps: true }
);
const UserModel = model("users", UserSchema);
export default UserModel;
