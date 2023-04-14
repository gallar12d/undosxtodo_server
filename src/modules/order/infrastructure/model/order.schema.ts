import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String },
    depot_name: { type: String, required: false },
    depot_id: { type: String, required: false },
    guide: { type: Number, required: true },
    guide_status: { type: String, required: false },
    seller_id:{ type: mongoose.Types.ObjectId },
    seller_address: { type: String, required: false },
    seller_city: { type: String, required: false },
    seller_state: { type: String, required: false },
    seller_telephone: { type: String, required: false },
    seller_nit: { type: String, required: false },
    seller_postal_code: { type: String, required: false },
    seller_country: { type: String, required: false },
    seller_email: { type: String, required: false },

    //client information
    client_name: { type: String, required: false },
    client_surname: { type: String, required: false },
    client_address: { type: String, required: false },
    client_address_detail: { type: String, required: false },
    client_city: { type: String, required: false },
    client_state: { type: String, required: false },
    client_telephone: { type: String, required: false },
    products: { type: Array, required: false },
    client_country: { type: String, required: false },
    value_to_collect: { type: Number, required: false },
  },
  { timestamps: true }
);
OrderSchema.plugin(paginate);
// const UserModel = mongoose.model("orders", OrderSchema);
module.exports= mongoose.model("orders", OrderSchema);
