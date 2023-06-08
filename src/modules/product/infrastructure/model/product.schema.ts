import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String },
    depots_ids: { type: [] },
    sku: { type: String },
    name: { type: String },
    price: { type: Number },
    status: { type: String },
    inventory_ids: { type: [], required: false }
  },
  { timestamps: true }
);
ProductSchema.plugin(paginate);
interface ProductDocument extends mongoose.Document { name, inventory_ids, depots_ids, sku, price, status }
const ProductModel = mongoose.model<ProductDocument, mongoose.PaginateModel<ProductDocument>>('Products', ProductSchema, 'products');
export { ProductModel };