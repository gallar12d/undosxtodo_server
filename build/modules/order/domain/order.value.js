"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValue = void 0;
var uuid_1 = require("uuid");
var OrderValue = /** @class */ (function () {
    function OrderValue(_a) {
        var depot_name = _a.depot_name, depot_id = _a.depot_id, guide = _a.guide, guide_status = _a.guide_status, seller_address = _a.seller_address, seller_city = _a.seller_city, seller_state = _a.seller_state, seller_telephone = _a.seller_telephone, seller_nit = _a.seller_nit, seller_postal_code = _a.seller_postal_code, seller_country = _a.seller_country, seller_email = _a.seller_email, client_name = _a.client_name, client_surname = _a.client_surname, client_address = _a.client_address, client_city = _a.client_city, client_state = _a.client_state, client_telephone = _a.client_telephone, products = _a.products, client_country = _a.client_country, value_to_collect = _a.value_to_collect;
        this.id = (0, uuid_1.v4)();
        this.depot_id = depot_id;
        this.depot_name = depot_name;
        this.guide = guide;
        this.guide_status = guide_status;
        this.seller_address = seller_address;
        this.seller_city = seller_city;
        this.seller_state = seller_state;
        this.seller_telephone = seller_telephone;
        this.seller_nit = seller_nit;
        this.seller_postal_code = seller_postal_code;
        this.seller_country = seller_country;
        this.seller_email = seller_email;
        this.client_name = client_name;
        this.client_surname = client_surname;
        this.client_address = client_address;
        this.client_city = client_city;
        this.client_state = client_state;
        this.client_telephone = client_telephone;
        this.products = products;
        this.client_country = client_country;
        this.value_to_collect = value_to_collect;
    }
    return OrderValue;
}());
exports.OrderValue = OrderValue;
