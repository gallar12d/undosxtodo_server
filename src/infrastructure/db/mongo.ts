import { connect, set } from "mongoose";

const DB_URI = `${process.env.DB_URI || "mongodb+srv://admin:admin@cluster0.rau7epe.mongodb.net/?retryWrites=true&w=majority"}`;

const dbInit = async () => {
  set("strictQuery", false);
  // await connect(`mongodb+srv://admin:admin@cluster0.rau7epe.mongodb.net/?retryWrites=true&w=majority`);
  await connect(`${DB_URI}`);
  console.log("Init DB");
};

export default dbInit;