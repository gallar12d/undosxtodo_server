import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const DealerSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String },
        code: { type: String },
        capacity: { type: Number },
        email: { type: String },
        depot_ids: { type: String }
        // picture: { type: Buffer }
    },
    { timestamps: { currentTime: () => new Date(Date.now() - 5 * 60 * 60 * 1000) } }
    //   { timestamps: true }
);
DealerSchema.plugin(paginate);
interface DealerDocument extends mongoose.Document { }
const DealerModel = mongoose.model<DealerDocument, mongoose.PaginateModel<DealerDocument>>('Dealers', DealerSchema, 'dealers');
export { DealerModel };