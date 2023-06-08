import mongoose from "mongoose";
// const paginate= require('mongoose-paginate-v2');
import paginate from 'mongoose-paginate-v2';

const DepotSchema = new mongoose.Schema(
  {
    id: { type: String },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sellers',
    },
    state: { type: String },
    city: { type: String },
    name: { type: String },
    address: { type: String },
    status: { type: String }
  },
  { timestamps: true }
);
DepotSchema.plugin(paginate);
interface DepotDocument extends mongoose.Document { seller_id, name }
const DepotModel = mongoose.model<DepotDocument, mongoose.PaginateModel<DepotDocument>>('Depots', DepotSchema, 'depots');
export { DepotModel };