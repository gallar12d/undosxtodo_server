import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./infrastructure/routes"
import db from "./infrastructure/db/mongo";
const PORT = process.env.PORT || 3000;
// const PORT = 3000;
const app = express();
app.use(cors({
    origin: 'https://ultimilla.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));
// app.use(async (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://ultimilla.com"); // update to match the domain you will make the request from
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));