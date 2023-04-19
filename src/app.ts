import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./infrastructure/routes"
import db from "./infrastructure/db/mongo";
const PORT = process.env.PORT || 3000;
// const PORT = 3000;
const app = express();
const allowedOrigins = ['https://ultimilla.com', 'http://localhost:3001'];
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));