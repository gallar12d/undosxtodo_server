"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepotValue = void 0;
var uuid_1 = require("uuid");
var DepotValue = /** @class */ (function () {
    function DepotValue(_a) {
        var seller_id = _a.seller_id, name = _a.name, state = _a.state, city = _a.city, address = _a.address, status = _a.status;
        this.id = (0, uuid_1.v4)();
        this.seller_id = seller_id;
        this.name = name;
        this.state = state;
        this.city = city;
        this.address = address;
        this.status = status;
    }
    ;
    return DepotValue;
}());
exports.DepotValue = DepotValue;
