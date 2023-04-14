import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema(
  {
    id: {type: String},
    depots_ids: {type: []},
    sku: {type: String},
    name: {type: String},
    price: {type: Number}
  },
  { timestamps: true }
);
ProductSchema.plugin(paginate);
// const ProductModel = mongoose.model("products", ProductSchema);
module.exports= mongoose.model("products", ProductSchema);