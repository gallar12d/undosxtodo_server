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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
var vehicle_schema_1 = require("../model/vehicle.schema");
var axios_1 = __importDefault(require("axios"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dealer_schema_1 = require("../../../dealer/infrastructure/model/dealer.schema");
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.authBody = {
            "grant_type": "client_credentials",
            "client_id": "1007",
            "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
        };
    }
    MongoRepository.prototype.createVehicle = function (newVehicle) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, currentTimestamp, token, dealerId, resVehicle, insertedVehicle, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        if (!!this.tokenR99) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", this.authBody)];
                    case 1:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        return [3 /*break*/, 4];
                    case 2:
                        decoded = jsonwebtoken_1.default.decode(this.tokenR99);
                        if (!decoded || !decoded.exp) {
                            return [2 /*return*/, true]; // El token no es válido o no tiene fecha de expiración
                        }
                        currentTimestamp = Math.floor(Date.now() / 1000);
                        if (!(decoded.exp < currentTimestamp)) return [3 /*break*/, 4];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", this.authBody)];
                    case 3:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, dealer_schema_1.DealerModel.findOne({ id: newVehicle.dealer_id })];
                    case 5:
                        dealerId = _a.sent();
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/vehicle", {
                                code: newVehicle.code,
                                capacity: newVehicle.capacity,
                                name: newVehicle.name,
                                user_id: dealerId.ruta99_id,
                                vehicle_type: newVehicle.vehicle_type
                            }, {
                                headers: {
                                    Authorization: "Bearer ".concat(this.tokenR99)
                                }
                            })];
                    case 6:
                        resVehicle = _a.sent();
                        if (!(resVehicle.status === 201)) return [3 /*break*/, 8];
                        newVehicle.ruta99_id = resVehicle.data.vehicle.id;
                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.create(newVehicle)];
                    case 7:
                        insertedVehicle = _a.sent();
                        return [2 /*return*/, insertedVehicle];
                    case 8: return [2 /*return*/, 400];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, 400];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.changeVehicleStatus = function (vehicle_id, newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedVehicle, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.updateOne({ id: vehicle_id }, {
                                $set: {
                                    status: newStatus
                                }
                            })];
                    case 1:
                        updatedVehicle = _a.sent();
                        return [2 /*return*/, updatedVehicle];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.getVehicles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vehicles, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, vehicle_schema_1.VehicleModel.find({}, { id: 1, name: 1, code: 1, status: 1, availability: 1 })];
                    case 1:
                        vehicles = _a.sent();
                        return [2 /*return*/, vehicles];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
