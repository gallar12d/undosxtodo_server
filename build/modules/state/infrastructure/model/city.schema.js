import { Schema, model } from "mongoose";
const CitySchema = new Schema({
    id: { type: String },
    state_id: { type: String },
    name: { type: String }
}, { timestamps: true });
const CityModel = model("cities", CitySchema);
export default CityModel;
