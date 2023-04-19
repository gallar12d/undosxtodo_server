import mongoose from "mongoose";
// const paginate= require('mongoose-paginate-v2');
import paginate from 'mongoose-paginate-v2';

const DepotSchema = new mongoose.Schema(
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
DepotSchema.plugin(paginate);
// const DepotModel = mongoose.model("depots", DepotSchema);
// export {DepotModel};
module.exports= mongoose.model("depots", DepotSchema);