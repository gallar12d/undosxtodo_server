"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var user_value_1 = require("../domain/user.value");
var UserService = /** @class */ (function () {
    function UserService(userRepository) {
        var _this = this;
        this.userRepository = userRepository;
        this.createToken = function (id) {
            var token = _this.userRepository.createToken(id);
            return token;
        };
    }
    UserService.prototype.registerUser = function (_a) {
        var seller_id = _a.seller_id, name = _a.name, email = _a.email, password = _a.password, rol = _a.rol, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var userValue, encripted_password, userCreated, user_response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userValue = new user_value_1.UserValue({ seller_id: seller_id, name: name, email: email, password: password, rol: rol, type: type, status: "inactive" });
                        return [4 /*yield*/, this.userRepository.encriptPassword(userValue.password)];
                    case 1:
                        encripted_password = _b.sent();
                        userValue.encript(encripted_password);
                        return [4 /*yield*/, this.userRepository.registerUser(userValue)];
                    case 2:
                        userCreated = _b.sent();
                        user_response = {
                            id: userCreated.id,
                            name: userCreated.name,
                            email: userCreated.email,
                            token: this.createToken(userCreated.id)
                        };
                        return [2 /*return*/, user_response];
                }
            });
        });
    };
    UserService.prototype.findUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findUser(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.userExist = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (user)
                            return [2 /*return*/, true];
                        return [2 /*return*/, false];
                }
            });
        });
    };
    UserService.prototype.allUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.allUser()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.loginUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.loginUser(email, password)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        user_response = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token: this.createToken(user.id),
                            rol: user.rol,
                            type: user.type,
                            status: user.status
                        };
                        return [2 /*return*/, user_response];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (id, email) {
        return __awaiter(this, void 0, void 0, function () {
            var userUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.updateUser(id, email)];
                    case 1:
                        userUpdated = _a.sent();
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
