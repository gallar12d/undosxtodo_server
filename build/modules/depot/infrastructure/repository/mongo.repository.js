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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
var depot_schema_1 = require("../model/depot.schema");
var seller_schema_1 = __importDefault(require("../../../seller/infrastructure/model/seller.schema"));
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
    }
    MongoRepository.prototype.insertDepot = function (depot) {
        return __awaiter(this, void 0, void 0, function () {
            var insertedDepot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, depot_schema_1.DepotModel.create(depot)];
                    case 1:
                        insertedDepot = _a.sent();
                        return [2 /*return*/, insertedDepot];
                }
            });
        });
    };
    MongoRepository.prototype.getDepots = function (seller_id) {
        return __awaiter(this, void 0, void 0, function () {
            var depots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, depot_schema_1.DepotModel.find({ "seller_id": seller_id }, { _id: 1, id: 1, name: 1, city: 1, state: 1, address: 1 })];
                    case 1:
                        depots = _a.sent();
                        return [2 /*return*/, depots];
                }
            });
        });
    };
    MongoRepository.prototype.updateDepot = function (_a) {
        var id = _a.id, seller_id = _a.seller_id, name = _a.name, state = _a.state, city = _a.city, address = _a.address;
        return __awaiter(this, void 0, void 0, function () {
            var updatedDepot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, depot_schema_1.DepotModel.updateOne({ "id": "".concat(id) }, { seller_id: seller_id, name: name, state: state, city: city, address: address })];
                    case 1:
                        updatedDepot = _b.sent();
                        return [2 /*return*/, updatedDepot];
                }
            });
        });
    };
    MongoRepository.prototype.deleteDepot = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedDepot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, depot_schema_1.DepotModel.deleteOne({ "id": id })];
                    case 1:
                        deletedDepot = _a.sent();
                        return [2 /*return*/, deletedDepot];
                }
            });
        });
    };
    MongoRepository.prototype.allDepots = function (pag) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, result, depots, _d, _e, _f, depot, _g, e_1_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        options = {
                            page: pag,
                            limit: 7
                        };
                        return [4 /*yield*/, depot_schema_1.DepotModel.paginate({}, options)];
                    case 1:
                        result = _h.sent();
                        depots = JSON.parse(JSON.stringify(result));
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 10, 11, 16]);
                        _d = true, _e = __asyncValues(depots.docs);
                        _h.label = 3;
                    case 3: return [4 /*yield*/, _e.next()];
                    case 4:
                        if (!(_f = _h.sent(), _a = _f.done, !_a)) return [3 /*break*/, 9];
                        _c = _f.value;
                        _d = false;
                        _h.label = 5;
                    case 5:
                        _h.trys.push([5, , 7, 8]);
                        depot = _c;
                        _g = depot;
                        return [4 /*yield*/, seller_schema_1.default.findOne({ _id: depot.seller_id })];
                    case 6:
                        _g.seller = (_h.sent()).name;
                        return [3 /*break*/, 8];
                    case 7:
                        _d = true;
                        return [7 /*endfinally*/];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _h.trys.push([11, , 14, 15]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _b.call(_e)];
                    case 12:
                        _h.sent();
                        _h.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/, depots];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
