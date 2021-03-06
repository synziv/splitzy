"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(data) {
        this.name = '';
        this.total = 0;
        this.splitMode = '';
        this.name = data.name;
        this.total = data.total;
        this.user = data.user;
        this.splitMode = data.splitMode;
        this.groupId = data.groupId;
        this.splitWith = data.splitWith;
    }
}
exports.Item = Item;
// name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number
//# sourceMappingURL=item.js.map