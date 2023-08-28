"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var node_crypto_1 = require("node:crypto");
var User = /** @class */ (function () {
    function User(_a) {
        var id = _a.id, username = _a.username, name = _a.name, password = _a.password, active = _a.active, created_at = _a.created_at;
        this.id = id !== null && id !== void 0 ? id : (0, node_crypto_1.randomUUID)();
        this.username = username;
        this.name = name;
        this.password = password;
        this.active = active !== null && active !== void 0 ? active : true;
        this.created_at = created_at !== null && created_at !== void 0 ? created_at : new Date();
        this.updated_at = new Date();
    }
    return User;
}());
exports.User = User;
