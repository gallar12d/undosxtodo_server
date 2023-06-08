"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealerValue = void 0;
var uuid_1 = require("uuid");
var DealerValue = /** @class */ (function () {
    function DealerValue(_a) {
        var name = _a.name, code = _a.code, capacity = _a.capacity, email = _a.email, depot_ids = _a.depot_ids;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.code = code;
        this.capacity = capacity;
        this.email = email;
        this.depot_ids = depot_ids;
    }
    return DealerValue;
}());
exports.DealerValue = DealerValue;
