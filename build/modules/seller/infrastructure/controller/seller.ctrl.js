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
exports.SellerController = void 0;
var seller_value_1 = require("../../domain/seller.value");
var SellerController = /** @class */ (function () {
    function SellerController(sellerService) {
        var _this = this;
        this.sellerService = sellerService;
        this.getSeller = function (_a, res) {
            var token = _a.token;
            return __awaiter(_this, void 0, void 0, function () {
                var seller;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.sellerService.getSeller(token.id)];
                        case 1:
                            seller = _b.sent();
                            res.send(seller);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getAllSellers = function (_a, res) {
            var params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var pag, sellers;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            pag = params.pag;
                            return [4 /*yield*/, this.sellerService.getAllSellers(pag)];
                        case 1:
                            sellers = _b.sent();
                            res.send(sellers);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.createSeller = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var name, country, state, city, address, telephone, nit, postal_code, email, newSeller, sellerCreated;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = body.name, country = body.country, state = body.state, city = body.city, address = body.address, telephone = body.telephone, nit = body.nit, postal_code = body.postal_code, email = body.email;
                            newSeller = new seller_value_1.SellerValue({
                                name: name,
                                country: country,
                                state: state,
                                city: city,
                                address: address,
                                telephone: telephone,
                                nit: nit,
                                postal_code: postal_code,
                                email: email
                            });
                            return [4 /*yield*/, this.sellerService.createSeller(newSeller)];
                        case 1:
                            sellerCreated = _b.sent();
                            res.send(sellerCreated);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.updateSeller = function (_a, res) {
            var body = _a.body;
            return __awaiter(_this, void 0, void 0, function () {
                var id, name, country, state, city, address, telephone, nit, postal_code, email, sellerToUpdate, sellerUpdated;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = body.id, name = body.name, country = body.country, state = body.state, city = body.city, address = body.address, telephone = body.telephone, nit = body.nit, postal_code = body.postal_code, email = body.email;
                            sellerToUpdate = { id: id, name: name, country: country, state: state, city: city, address: address, telephone: telephone, nit: nit, postal_code: postal_code, email: email };
                            return [4 /*yield*/, this.sellerService.updateSeller(sellerToUpdate)];
                        case 1:
                            sellerUpdated = _b.sent();
                            res.send(sellerUpdated);
                            return [2 /*return*/];
                    }
                });
            });
        };
    }
    return SellerController;
}());
exports.SellerController = SellerController;
