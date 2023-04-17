import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./infrastructure/routes"
import db from "./infrastructure/db/mongo";
const PORT = process.env.PORT || 3000;
// const PORT = 3000;
const app = express();
var corsOptions = {
    origin: "https://ultimilla.com/",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(cors(corsOptions));
app.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://ultimilla.com"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));