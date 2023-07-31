"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValue = void 0;
var uuid_1 = require("uuid");
var UserValue = /** @class */ (function () {
    function UserValue(_a) {
        var seller_id = _a.seller_id, name = _a.name, email = _a.email, password = _a.password, rol = _a.rol, status = _a.status;
        var _this = this;
        this.encript = function (encriptedPaswword) {
            _this.password = encriptedPaswword;
        };
        this.id = (0, uuid_1.v4)();
        this.seller_id = seller_id;
        this.name = name;
        this.email = email.toLowerCase();
        this.password = password;
        this.rol = rol;
        this.status = status;
    }
    return UserValue;
}());
exports.UserValue = UserValue;
