var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UserController {
    constructor(userService) {
        this.userService = userService;
        this.findUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findUser(req.params.id);
            res.send(user);
        });
        this.allUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.allUser();
            res.send(users);
        });
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.userService.userExist(req.body.email);
            if (exist)
                return res.status(400).send("User already exist");
            const user = yield this.userService.registerUser(req.body);
            res.send(user);
        });
        this.updateUser = ({ body }, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = body;
            const { email } = body;
            const userUpdated = yield this.userService.updateUser(id, email);
            res.send(userUpdated);
        });
        this.returnToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(req.token);
        });
    }
}
