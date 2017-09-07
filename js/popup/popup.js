"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../storage/storage");
const popup_interface_1 = require("../interface/popup.interface");
const message_interface_1 = require("../interface/message.interface");
class Popup {
    constructor() {
        this.npcStorage = new storage_1.Storage();
    }
    init() {
        return new Promise((resolve, reject) => {
            this.initStorages()
                .then(() => {
                resolve();
            });
        });
    }
    initStorages() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.load(popup_interface_1.PopupDataType.NPC)
            ])
                .then((data) => {
                this.npcStorage.set(data[0]);
                resolve();
            });
        });
    }
    draw(type) {
        switch (type) {
            case popup_interface_1.PopupDataType.NPC:
                var npcs = this.npcStorage.getAll();
                var i = 0, max = npcs.length;
                for (; i < max; i++) {
                }
                break;
        }
    }
    load(type) {
        return new Promise((resolve, reject) => {
            let message;
            switch (type) {
                case popup_interface_1.PopupDataType.NPC:
                    message = {
                        type: message_interface_1.NpcMessageType.GET,
                        sender: message_interface_1.MessagePeer.Popup,
                        receiver: message_interface_1.MessagePeer.Npc
                    };
                    break;
            }
            chrome.runtime.sendMessage(message, function (response) {
                if (response.type === message_interface_1.MessageType.CONFIRMATION)
                    resolve(response.content);
                reject(response.content);
            });
        });
    }
    sendToGroup(content) {
        return new Promise((resolve, reject) => {
            let message = {
                type: message_interface_1.ChatMessageType.SENDTOGRP,
                sender: message_interface_1.MessagePeer.Popup,
                receiver: message_interface_1.MessagePeer.Chat,
                content: content
            };
            chrome.runtime.sendMessage(message, function (response) {
                if (response.type === message_interface_1.MessageType.CONFIRMATION) {
                    resolve(true);
                    return;
                }
                reject(response.content);
            });
        });
    }
    get() {
        return this.npcStorage.getAll();
    }
    delete(type, id) {
        return new Promise((resolve, reject) => {
            let message;
            let deleteFromStorage = false;
            switch (type) {
                case popup_interface_1.PopupDataType.NPC:
                    message = {
                        type: message_interface_1.NpcMessageType.DELETE,
                        sender: message_interface_1.MessagePeer.Popup,
                        receiver: message_interface_1.MessagePeer.Npc,
                        content: id
                    };
                    deleteFromStorage = true;
                    break;
            }
            var self = this;
            chrome.runtime.sendMessage(message, function (response) {
                if (response.type === message_interface_1.MessageType.CONFIRMATION) {
                    if (deleteFromStorage)
                        self.deleteFromStorage(type, id)
                            .then(() => {
                            resolve(true);
                        });
                    else
                        resolve(true);
                }
                reject(response.content);
            });
        });
    }
    deleteFromStorage(type, id) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case popup_interface_1.PopupDataType.NPC:
                    this.npcStorage.delete(id);
                    break;
            }
            resolve();
        });
    }
}
exports.Popup = Popup;
