import mongoose from "mongoose";
// const paginate= require('mongoose-paginate-v2');
import paginate from 'mongoose-paginate-v2';
const DepotSchema = new mongoose.Schema({
    id: { type: String },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
    },
    ruta99_id: { type: Number, required: false },
    state: { type: String },
    city: { type: String },
    name: { type: String },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    address: { type: String },
    status: { type: String }
}, { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } });
DepotSchema.plugin(paginate);
const DepotModel = mongoose.model('Depots', DepotSchema, 'depots');
export { DepotModel };
