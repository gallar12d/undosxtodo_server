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
interface ProductDocument extends mongoose.Document { }
const ProductModel = mongoose.model<ProductDocument,mongoose.PaginateModel<ProductDocument>>('Products', ProductSchema, 'products');
export {ProductModel};