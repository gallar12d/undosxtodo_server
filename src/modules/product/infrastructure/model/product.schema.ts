import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    id: {type: String},
    depots_ids: {type: []},
    sku: {type: String},
    name: {type: String},
    price: {type: Number}
  },
  { timestamps: true }
);
const ProductModel = model("products", ProductSchema);
export default ProductModel;