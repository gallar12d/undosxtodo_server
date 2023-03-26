import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const SECRET_KEY = `${process.env.SECRET_KEY}`;
// const SECRET_KEY = `secret@123`;
import getErrorMessage from "../utils/handleErrors";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Please authenticate");
    }
    console.log(SECRET_KEY);
    
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send(getErrorMessage(err));
  }
};
