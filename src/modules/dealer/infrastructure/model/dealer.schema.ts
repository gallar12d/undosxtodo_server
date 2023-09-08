import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const DealerSchema = new mongoose.Schema(
    {
        id: { type: String },
        seller_id: { type: String, required: false },
        ruta99_id: { type: Number, required: false },
        shipday_id: { type: Number, required: false },
        name: { type: String },
        phone_number: { type: String, required: false },
        email: { type: String },
        identification: { type: Number, required: false },
        role: { type: String },
        password: { type: String },
        rfc: { type: String, required: false },
        driver_license: { type: String, required: false },
        status: { type: String },
        platform: { type: String },
    },
    { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } }
    //   { timestamps: true }
);
DealerSchema.plugin(paginate);
interface DealerDocument extends mongoose.Document { ruta99_id }
const DealerModel = mongoose.model<DealerDocument, mongoose.PaginateModel<DealerDocument>>('Dealers', DealerSchema, 'dealers');
export { DealerModel };