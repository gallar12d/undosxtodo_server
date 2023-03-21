import mongoose, { Schema, model } from "mongoose";

const DepotSchema = new Schema(
  {
    id: {type: String},
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
      },
    state: {type: String},
    city: {type: String},
    name: {type: String},
    address: {type: String}
  },
  { timestamps: true }
);
const DepotModel = model("depots", DepotSchema);
export default DepotModel;