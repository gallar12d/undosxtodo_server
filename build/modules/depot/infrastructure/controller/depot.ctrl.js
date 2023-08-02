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
exports.DepotController = void 0;
var depot_value_1 = require("../../domain/depot.value");
var handleErrors_1 = __importDefault(require("../../../../infrastructure/utils/handleErrors"));
var DepotController = /** @class */ (function () {
    function DepotController(depotService) {
        var _this = this;
        this.depotService = depotService;
        this.insertDepot = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var seller_id, name, state, city, latitude, longitude, address, status, newDepot, insertedDepot, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            seller_id = body.seller_id, name = body.name, state = body.state, city = body.city, latitude = body.latitude, longitude = body.longitude, address = body.address, status = body.status;
                            newDepot = new depot_value_1.DepotValue({
                                seller_id: seller_id,
                                name: name,
                                state: state,
                                city: city,
                                latitude: latitude,
                                longitude: longitude,
                                address: address,
                                status: status
                            });
                            return [4 /*yield*/, this.depotService.insertDepot(newDepot)];
                        case 1:
                            insertedDepot = _b.sent();
                            res.send(insertedDepot);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            err_1.message = err_1.response.data.errors;
                            res.status(400).json((0, handleErrors_1.default)(err_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getDepots = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var seller_id, depots;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            seller_id = body.seller_id;
                            return [4 /*yield*/, this.depotService.getDepots(seller_id)];
                        case 1:
                            depots = _b.sent();
                            res.send(depots);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getDepotsPage = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var seller_id, pag, depots;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            seller_id = body.seller_id, pag = body.pag;
                            return [4 /*yield*/, this.depotService.getDepotsPage(seller_id, pag)];
                        case 1:
                            depots = _b.sent();
                            res.send(depots);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.updateDepot = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var updatedDepot, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.depotService.updateDepot(body)];
                        case 1:
                            updatedDepot = _b.sent();
                            res.send(updatedDepot);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _b.sent();
                            // console.log(err.response.data);
                            err_2.message = err_2.response.data.errors || err_2.response.data.message;
                            res.status(400).json((0, handleErrors_1.default)(err_2));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.deleteDepot = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, depotDeleted, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.depotService.deleteDepot(id)];
                    case 1:
                        depotDeleted = _a.sent();
                        res.send(depotDeleted);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        err_3.message = err_3.response.data.errors;
                        res.status(400).json((0, handleErrors_1.default)(err_3));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.allDepots = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var pag, depots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pag = req.params.pag;
                        return [4 /*yield*/, this.depotService.allDepots(pag)];
                    case 1:
                        depots = _a.sent();
                        res.send(depots);
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return DepotController;
}());
exports.DepotController = DepotController;
