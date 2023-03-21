"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerValue = void 0;
var uuid_1 = require("uuid");
var SellerValue = /** @class */ (function () {
    function SellerValue(_a) {
        var name = _a.name, country = _a.country, state = _a.state, city = _a.city, address = _a.address, telephone = _a.telephone, nit = _a.nit, postal_code = _a.postal_code, email = _a.email;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
        this.telephone = telephone;
        this.nit = nit;
        this.postal_code = postal_code;
        this.email = email.toLowerCase();
    }
    return SellerValue;
}());
exports.SellerValue = SellerValue;
