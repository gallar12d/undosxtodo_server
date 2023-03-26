import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./infrastructure/routes"
import db from "./infrastructure/db/mongo";
const PORT = process.env.PORT || 3000;
// const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));