"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValue = void 0;
var uuid_1 = require("uuid");
var ProductValue = /** @class */ (function () {
    function ProductValue(_a) {
        var depots_ids = _a.depots_ids, sku = _a.sku, name = _a.name, price = _a.price, status = _a.status;
        this.id = (0, uuid_1.v4)();
        this.depots_ids = depots_ids;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.status = status;
    }
    ;
    return ProductValue;
}());
exports.ProductValue = ProductValue;
