import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const OrderSettingSchema = new mongoose.Schema(
  {
    id: { type: String },
    limitHour: { type: Number },
    limitMinutes: { type: Number },
    maxAmountPerZone: { type: Number },
    ordersLimitPerZone: { type: Number },
    zoneTime: { type: Number },
    limitShipments: { type: Number },
    openingHour: { type: Number },
    openingMinutes: { type: Number }
  },
  { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } }
  //   { timestamps: true }
);
OrderSettingSchema.plugin(paginate);
interface OrderSettingDocument extends mongoose.Document { limitHour, limitMinutes, maxAmountPerZone, ordersLimitPerZone, zoneTime, limitShipments, openingHour, openingMinutes }
const OrderSettingModel = mongoose.model<OrderSettingDocument, mongoose.PaginateModel<OrderSettingDocument>>('OrdersSettings', OrderSettingSchema, 'ordersSettings');
export { OrderSettingModel };
