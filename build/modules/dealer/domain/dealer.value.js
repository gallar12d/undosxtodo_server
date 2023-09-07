"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealerValue = void 0;
var uuid_1 = require("uuid");
var DealerValue = /** @class */ (function () {
    function DealerValue(_a) {
        var ruta99_id = _a.ruta99_id, shipday_id = _a.shipday_id, name = _a.name, phone_number = _a.phone_number, email = _a.email, identification = _a.identification, role = _a.role, password = _a.password, rfc = _a.rfc, driver_license = _a.driver_license, status = _a.status, platform = _a.platform;
        this.id = (0, uuid_1.v4)();
        this.ruta99_id = ruta99_id;
        this.shipday_id = shipday_id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
        this.identification = identification;
        this.role = role;
        this.password = password;
        this.rfc = rfc;
        this.driver_license = driver_license;
        this.status = status;
        this.platform = platform;
    }
    return DealerValue;
}());
exports.DealerValue = DealerValue;
