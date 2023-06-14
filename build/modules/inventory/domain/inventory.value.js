"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryValue = void 0;
var uuid_1 = require("uuid");
var InventoryValue = /** @class */ (function () {
    function InventoryValue(_a) {
        var seller_id = _a.seller_id, product_id = _a.product_id, quantity = _a.quantity, depot_id = _a.depot_id, income_type = _a.income_type, history = _a.history, status = _a.status;
        this.id = (0, uuid_1.v4)();
        this.seller_id = seller_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.depot_id = depot_id;
        this.income_type = income_type;
        this.history = history;
        this.status = status;
    }
    return InventoryValue;
}());
exports.InventoryValue = InventoryValue;
