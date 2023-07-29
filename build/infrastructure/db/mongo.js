var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connect, set } from "mongoose";
const DB_URI = `${process.env.DB_URI || "mongodb+srv://admin:admin@cluster0.rau7epe.mongodb.net/?retryWrites=true&w=majority"}`;
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    // await connect(`mongodb+srv://admin:admin@cluster0.rau7epe.mongodb.net/?retryWrites=true&w=majority`);
    set("strictQuery", false);
    yield connect(`${DB_URI}`);
    console.log("Init DB");
});
export default dbInit;
