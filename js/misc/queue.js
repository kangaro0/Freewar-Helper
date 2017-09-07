"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.items = new Array();
    }
    enqueue(item) {
        this.items.push(item);
        this.count++;
    }
    dequeue() {
        if (this.count === 0)
            return undefined;
        let items = this.items.splice(0, 1);
        return items[0];
    }
}
exports.Queue = Queue;
