"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleValue = void 0;
var uuid_1 = require("uuid");
var VehicleValue = /** @class */ (function () {
    function VehicleValue(_a) {
        var dealer_id = _a.dealer_id, code = _a.code, zone_id = _a.zone_id, ruta99_id = _a.ruta99_id, capacity = _a.capacity, name = _a.name, phone = _a.phone, email = _a.email, description = _a.description, depot_id = _a.depot_id, picture = _a.picture, vehicle_type = _a.vehicle_type, status = _a.status, availability = _a.availability;
        this.id = (0, uuid_1.v4)();
        this.dealer_id = dealer_id;
        this.zone_id = zone_id;
        this.ruta99_id = ruta99_id;
        this.code = code;
        this.capacity = capacity;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.description = description;
        this.depot_id = depot_id;
        this.picture = picture;
        this.vehicle_type = vehicle_type;
        this.status = status;
        this.availability = availability;
    }
    return VehicleValue;
}());
exports.VehicleValue = VehicleValue;
