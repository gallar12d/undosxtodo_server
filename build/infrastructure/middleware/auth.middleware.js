import jwt from "jsonwebtoken";
const SECRET_KEY = `${process.env.SECRET_KEY || "secret@123"}`;
// const SECRET_KEY = `secret@123`;
import getErrorMessage from "../utils/handleErrors";
export const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send(getErrorMessage(err));
    }
};
