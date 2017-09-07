"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_interface_1 = require("../interface/message.interface");
class NpcStorage {
    constructor() {
        this.npcs = new Array();
        this.ready = false;
        this.load()
            .then(() => { this.ready = true; });
    }
    load() {
        return new Promise((resolve, reject) => {
            let self = this;
            chrome.storage.sync.get('npcs', function (result) {
                if (!result['npcs']) {
                    self.create();
                    return;
                }
                this.npcs = result['npcs'];
            });
        });
    }
    create() {
        chrome.storage.sync.set({ 'npcs': new Array(0) }, function () {
        });
    }
    add(npc) {
        return new Promise((resolve, reject) => {
            this.npcs.push(npc);
            chrome.storage.sync.set({ 'npcs': this.npcs }), function () {
                resolve();
            };
        });
    }
    get() {
        return new Promise((resolve, reject) => {
        });
    }
}
exports.NpcStorage = NpcStorage;
var npcStorage = new NpcStorage();
/* Worker Namespace */
var self = this;
exports.self = self;
self.onmessage = (message) => {
    switch (message.type) {
        case message_interface_1.NpcMessageType.ADD:
            npcStorage.add(message.content)
                .then(() => {
                self.postMessage({ guid: message.guid, type: message_interface_1.MessageType.CONFIRMATION, sender: message_interface_1.MessagePeer.Npc, receiver: message_interface_1.MessagePeer.Host, content: undefined });
            });
            break;
    }
};
