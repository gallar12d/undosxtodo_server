import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const VehicleSchema = new mongoose.Schema({
    id: { type: String },
    dealer_id: { type: String },
    zone_id: { type: String },
    ruta99_id: { type: Number },
    code: { type: String },
    capacity: { type: String },
    name: { type: String },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    description: { type: String, required: false },
    depot_id: { type: String, required: false },
    picture: { type: String, required: false },
    vehicle_type: { type: String, required: false },
    status: { type: String },
    availability: { type: String, require: false }
}, { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } }
//   { timestamps: true }
);
VehicleSchema.plugin(paginate);
const VehicleModel = mongoose.model('Vehicles', VehicleSchema, 'vehicles');
export { VehicleModel };
