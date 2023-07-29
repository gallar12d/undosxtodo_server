import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
const InventorySchema = new mongoose.Schema({
    id: { type: String },
    seller_id: { type: String },
    product_id: { type: String },
    quantity: { type: Number },
    depot_id: { type: String },
    history: { type: Array },
    status: { type: String }
}, { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } }
//   { timestamps: true }
);
InventorySchema.plugin(paginate);
const InventoryModel = mongoose.model('Inventory', InventorySchema, 'inventory');
export { InventoryModel };
