"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneValue = void 0;
var uuid_1 = require("uuid");
var ZoneValue = /** @class */ (function () {
    function ZoneValue(_a) {
        var name = _a.name, codes = _a.codes, cityId = _a.cityId;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.codes = codes;
        this.cityId = cityId;
    }
    return ZoneValue;
}());
exports.ZoneValue = ZoneValue;
