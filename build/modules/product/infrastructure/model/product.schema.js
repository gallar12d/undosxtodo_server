import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const ProductSchema = new mongoose.Schema({
    id: { type: String },
    depots_ids: { type: [] },
    sku: { type: String },
    name: { type: String },
    price: { type: Number },
    status: { type: String },
    inventory_ids: { type: [], required: false }
}, { timestamps: true });
ProductSchema.plugin(paginate);
const ProductModel = mongoose.model('Products', ProductSchema, 'products');
export { ProductModel };
