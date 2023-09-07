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
var dealer_schema_1 = require("../model/dealer.schema");
var axios_1 = __importDefault(require("axios"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var integration_1 = __importDefault(require("shipday/integration"));
var carrier_request_1 = __importDefault(require("shipday/integration/carrier/carrier.request"));
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
        this.shipdayClient = new integration_1.default('A9xc9Tk8QH.dcWOv1xxmMnXFwxti9HZ', 10000);
    }
    MongoRepository.prototype.createDealer = function (newDealer) {
        return __awaiter(this, void 0, void 0, function () {
            var carrierInfo, carrierReq, carriers, token, decoded, currentTimestamp, token, reqDealer, myNewDealer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(newDealer.platform === 'Shipday')) return [3 /*break*/, 5];
                        carrierInfo = new carrier_request_1.default(newDealer.name, newDealer.email, '+57' + newDealer.phone_number);
                        return [4 /*yield*/, this.shipdayClient.carrierService.addCarrier(carrierInfo)];
                    case 1:
                        carrierReq = _a.sent();
                        if (!!!carrierReq) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.shipdayClient.carrierService.getCarriers()];
                    case 2:
                        carriers = _a.sent();
                        // const carrierIndex = carriers.findIndex((carrier: any) => carrier.name === newDealer.name);
                        newDealer.shipday_id = carriers[carriers.length - 1].id;
                        return [4 /*yield*/, dealer_schema_1.DealerModel.create(newDealer)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [3 /*break*/, 13];
                    case 5:
                        if (!!this.tokenR99) return [3 /*break*/, 7];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 6:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        return [3 /*break*/, 9];
                    case 7:
                        decoded = jsonwebtoken_1.default.decode(this.tokenR99);
                        if (!decoded || !decoded.exp) {
                            return [2 /*return*/, true]; // El token no es válido o no tiene fecha de expiración
                        }
                        currentTimestamp = Math.floor(Date.now() / 1000);
                        if (!(decoded.exp < currentTimestamp)) return [3 /*break*/, 9];
                        return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/oauth/token", {
                                "grant_type": "client_credentials",
                                "client_id": "1007",
                                "client_secret": "qIlmA870AUYT114iTCki7XscawDWrA7NOzpMVCnv"
                            })];
                    case 8:
                        token = _a.sent();
                        this.tokenR99 = token.data.access_token;
                        _a.label = 9;
                    case 9: return [4 /*yield*/, axios_1.default.post("https://api.ruta99.co/v1/user", newDealer, {
                            headers: {
                                Authorization: "Bearer ".concat(this.tokenR99)
                            }
                        })];
                    case 10:
                        reqDealer = _a.sent();
                        if (!(reqDealer.status === 201)) return [3 /*break*/, 12];
                        newDealer.ruta99_id = reqDealer.data.user.id;
                        return [4 /*yield*/, dealer_schema_1.DealerModel.create(newDealer)];
                    case 11:
                        myNewDealer = _a.sent();
                        return [2 /*return*/, myNewDealer];
                    case 12: return [2 /*return*/, 400];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    MongoRepository.prototype.changeStatus = function (dealer_id, newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedDealer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dealer_schema_1.DealerModel.updateOne({ id: dealer_id }, {
                            $set: {
                                status: newStatus
                            }
                        })];
                    case 1:
                        updatedDealer = _a.sent();
                        return [2 /*return*/, updatedDealer];
                }
            });
        });
    };
    MongoRepository.prototype.getDealers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dealers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dealer_schema_1.DealerModel.find({}, { id: 1, name: 1, identification: 1, phone_number: 1, status: 1, platform: 1 })];
                    case 1:
                        dealers = _a.sent();
                        return [2 /*return*/, dealers];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
