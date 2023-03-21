import mongoose, { Schema, model } from "mongoose";

const SellerSchema = new Schema(
  {
    id: {type: String},
    name: {type: String},
    country: {type: String},
    state: {type: String},
    city: {type: String},
    address: {type: String},
    telephone: {type: String},
    nit: {type: String},
    postal_code: {type: String},
    email: {type: String},
  },
  { timestamps: true }
);
const SellerModel = model("seller", SellerSchema);
export default SellerModel;