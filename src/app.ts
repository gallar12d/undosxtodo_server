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
    origin: (origin, callback) => {
        console.log(origin);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));