import { Schema, model, Types } from "mongoose";

const StatusSchema = new Schema(
  {
    id: { type: String },
    name: {type: String}
  },
  { timestamps: true }
);
const StatusModel = model("status", StatusSchema);
export default StatusModel;
