"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(_a) {
        var id = _a.id, title = _a.title, completed = _a.completed;
        var dateStr = String(new Date().getTime());
        this.id = id || Number(dateStr.slice(dateStr.length - 3, dateStr.length));
        this.title = title;
        this.completed = completed !== null && completed !== void 0 ? completed : false;
    }
    return Task;
}());
exports.default = Task;
