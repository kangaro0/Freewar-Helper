"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../misc/queue");
class ChatManager {
    constructor(workerInstance) {
        this.instance = workerInstance;
        this.queue = new queue_1.Queue();
        this.ready = false;
    }
    init() {
        return new Promise((resolve, reject) => {
            this.getTab()
                .then((tab) => {
                this.tab = tab;
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getTab() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({}, function (tabs) {
                var expression = /https:\/\/welt[0-9]{1,2}.freewar.de/;
                var regexp = new RegExp(expression);
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].url && regexp.test(tabs[i].url)) {
                        resolve(tabs[i]);
                    }
                }
                reject(new Error('ChatManager: Tab not found.'));
            });
        });
    }
    initSendingInterval() {
        this.interval = setInterval(() => {
            if (!this.ready)
                return;
            let message;
            var self = this;
            while (message = this.queue.dequeue()) {
                chrome.tabs.sendMessage(this.tab.id, message, function (response) {
                    self.instance.postMessage(response);
                });
            }
        }, 1000);
    }
    sendMessage(message) {
        this.queue.enqueue(message);
    }
}
exports.ChatManager = ChatManager;
var self = this;
let chatManager = new ChatManager(self);
self.onmessage = (message) => {
    chatManager.sendMessage(message);
};
