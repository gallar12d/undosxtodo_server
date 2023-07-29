import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const ZoneSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    codes: { type: [] },
    cityId: { type: String }
}, { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } } //Comprobar si funciona
//   { timestamps: true }
);
ZoneSchema.plugin(paginate);
const ZoneModel = mongoose.model('Zones', ZoneSchema, 'zones');
export { ZoneModel };
