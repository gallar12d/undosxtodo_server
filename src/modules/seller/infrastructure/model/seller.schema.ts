import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const SellerSchema = new mongoose.Schema(
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
SellerSchema.plugin(paginate);
interface SellerDocument extends mongoose.Document {name}
const SellerModel = mongoose.model<SellerDocument, mongoose.PaginateModel<SellerDocument>>('Sellers', SellerSchema, 'sellers');
export { SellerModel };