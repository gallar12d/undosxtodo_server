"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepotValue = void 0;
var uuid_1 = require("uuid");
var DepotValue = /** @class */ (function () {
    function DepotValue(_a) {
        var seller_id = _a.seller_id, ruta99_id = _a.ruta99_id, name = _a.name, state = _a.state, city = _a.city, latitude = _a.latitude, longitude = _a.longitude, address = _a.address, status = _a.status;
        this.id = (0, uuid_1.v4)();
        this.seller_id = seller_id;
        this.ruta99_id = ruta99_id;
        this.name = name;
        this.state = state;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.status = status;
    }
    ;
    return DepotValue;
}());
exports.DepotValue = DepotValue;
