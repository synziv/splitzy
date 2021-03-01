"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(data) {
        this.name = '';
        this.total = 0;
        this.email = '';
        this.color = '';
        this.name = data.name;
        this.total = data.total || 0;
        this.color = data.color || '';
        this.groupId = data.groupId || '';
        this.email = data.email;
        this.id = data.id;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map