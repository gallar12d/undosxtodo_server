var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserValue } from "../domain/user.value";
export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.createToken = (id) => {
            const token = this.userRepository.createToken(id);
            return token;
        };
    }
    registerUser({ seller_id, name, email, password, rol }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userValue = new UserValue({ seller_id, name, email, password, rol, status: "inactive" });
            const encripted_password = yield this.userRepository.encriptPassword(userValue.password);
            userValue.encript(encripted_password);
            const userCreated = yield this.userRepository.registerUser(userValue);
            const user_response = {
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                token: this.createToken(userCreated.id)
            };
            return user_response;
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUser(id);
            return user;
        });
    }
    userExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserByEmail(email);
            if (user)
                return true;
            return false;
        });
    }
    allUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.allUser();
            return users;
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.loginUser(email, password);
            if (!user)
                return null;
            const user_response = {
                id: user.id,
                name: user.name,
                email: user.email,
                token: this.createToken(user.id),
                rol: user.rol,
                status: user.status
            };
            return user_response;
        });
    }
    updateUser(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this.userRepository.updateUser(id, email);
            return userUpdated;
        });
    }
}
