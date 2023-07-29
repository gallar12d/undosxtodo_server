var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from "../model/user.shchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export class MongoRepository {
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ id });
            return user;
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCreated = yield UserModel.create(user);
            return userCreated;
        });
    }
    allUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel.find();
            return users;
        });
    }
    createToken(id) {
        const token = jwt.sign({ id }, process.env.SECRET_KEY || "secret@123", {
            // const token = jwt.sign({ id }, "secret@123", {
            expiresIn: "50m",
        });
        return token;
    }
    encriptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const encriptedPaswword = yield bcrypt.hash(password, 10);
            return encriptedPaswword;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ email });
            return user;
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ email });
            if (!user)
                return null;
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch)
                return null;
            return user;
        });
    }
    updateUser(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield UserModel.updateOne({ "id": `${id}` }, { $set: { "email": `${email}` } });
            return userUpdated;
        });
    }
}
