"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./infrastructure/routes");
var mongo_1 = __importDefault(require("./infrastructure/db/mongo"));
var PORT = process.env.PORT || 3000;
// const PORT = 3000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(async (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://ultimilla.com"); // update to match the domain you will make the request from
//     // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express_1.default.json());
app.use(routes_1.router);
(0, mongo_1.default)().then(function () { return console.log("Conexion Ready"); });
app.listen(PORT, function () { return console.log("Listo por el puerto ".concat(PORT)); });
