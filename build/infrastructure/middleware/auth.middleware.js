"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET_KEY = "".concat(process.env.SECRET_KEY);
var handleErrors_1 = __importDefault(require("../utils/handleErrors"));
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        var decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send((0, handleErrors_1.default)(err));
    }
};
exports.authMiddleware = authMiddleware;
