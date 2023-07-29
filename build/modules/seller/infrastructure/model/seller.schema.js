import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const SellerSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    telephone: { type: String },
    nit: { type: String },
    postal_code: { type: String },
    email: { type: String },
}, { timestamps: true });
SellerSchema.plugin(paginate);
const SellerModel = mongoose.model('Sellers', SellerSchema, 'sellers');
export { SellerModel };
