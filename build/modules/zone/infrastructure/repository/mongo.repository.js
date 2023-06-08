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
exports.MongoRepository = void 0;
var zone_schema_1 = require("../model/zone.schema");
var MongoRepository = /** @class */ (function () {
    function MongoRepository() {
    }
    MongoRepository.prototype.setDefaultZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zonesToInsert, zones;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zonesToInsert = [
                            { name: "Norte 1", codes: [760001, 760002, 760003, 760004, 760006, 760046, 760050], cityId: "1009" },
                            { name: "Ladera 1", codes: [760044, 760045, 760009], cityId: "1009" },
                            { name: "Ladera 2", codes: [760008], cityId: "1009" },
                            { name: "Oriente 1", codes: [760010, 760011, 760012, 760013, 760014], cityId: "1009" },
                            { name: "Oriente 2", codes: [760015, 760016, 760020, 760021, 760022, 760023, 760024, 760025], cityId: "1009" },
                            { name: "Oriente 3", codes: [760026, 760007, 760030, 760031, 760032], cityId: "1009" },
                            { name: "Oeste - Centro", codes: [760040, 760041, 760042, 760043], cityId: "1009" },
                            { name: "Sur", codes: [760033, 760034, 760035, 760036], cityId: "1009" }
                        ];
                        return [4 /*yield*/, zone_schema_1.ZoneModel.create(zonesToInsert)];
                    case 1:
                        zones = _a.sent();
                        return [2 /*return*/, zones];
                }
            });
        });
    };
    MongoRepository.prototype.getZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zone_schema_1.ZoneModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoRepository.prototype.createZone = function (name, codes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zone_schema_1.ZoneModel.create({ name: name, codes: codes })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoRepository.prototype.setZone = function (oldName, name, codes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zone_schema_1.ZoneModel.updateOne({ name: oldName }, { $set: { name: name, codes: codes } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MongoRepository;
}());
exports.MongoRepository = MongoRepository;
