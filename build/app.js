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
// const allowedOrigins = ['https://ultimilla.com', 'http://localhost:3001'];
var corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(routes_1.router);
(0, mongo_1.default)().then(function () { return console.log("Conexion Ready"); });
app.listen(PORT, function () { return console.log("Listo por el puerto ".concat(PORT)); });
