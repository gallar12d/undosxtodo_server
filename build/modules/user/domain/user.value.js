"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValue = void 0;
var uuid_1 = require("uuid");
var UserValue = /** @class */ (function () {
    function UserValue(_a) {
        var name = _a.name, email = _a.email, password = _a.password;
        var _this = this;
        this.encript = function (encriptedPaswword) {
            _this.password = encriptedPaswword;
        };
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.email = email.toLowerCase();
        this.password = password;
    }
    return UserValue;
}());
exports.UserValue = UserValue;
