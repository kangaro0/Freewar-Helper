"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor() {
        this.items = new Array();
    }
    set(items) {
        this.items = items;
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    delete(id) {
        let index = this.items.indexOf(this.items.find((npc) => npc.id === id));
        if (index === -1)
            return;
        this.items.splice(index, 1);
    }
}
exports.Storage = Storage;
