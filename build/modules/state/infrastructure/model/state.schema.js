import { Schema, model } from "mongoose";
const StateSchema = new Schema({
    id: { type: String },
    name: { type: String }
}, { timestamps: true });
const StateModel = model("states", StateSchema);
export default StateModel;
