/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __webpack_require__(2);
const popup_interface_1 = __webpack_require__(3);
const message_interface_1 = __webpack_require__(4);
class Popup {
    constructor() {
        this.npcStorage = new storage_1.Storage();
    }
    init() {
        this.initStorages()
            .then(() => {
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
                var npcs = this.npcStorage.get();
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor() {
        this.npcs = new Array();
    }
    set(npcs) {
        this.npcs = npcs;
    }
    get() {
        return this.npcs;
    }
    delete(id) {
        let index = this.npcs.indexOf(this.npcs.find((npc) => npc.id === id));
        if (index === -1)
            return;
        delete this.npcs[index];
    }
}
exports.Storage = Storage;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PopupDataType;
(function (PopupDataType) {
    PopupDataType[PopupDataType["NPC"] = 0] = "NPC";
    PopupDataType[PopupDataType["TAB"] = 1] = "TAB";
})(PopupDataType = exports.PopupDataType || (exports.PopupDataType = {}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CONFIRMATION"] = 0] = "CONFIRMATION";
    MessageType[MessageType["ERROR"] = 1] = "ERROR";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var NpcMessageType;
(function (NpcMessageType) {
    NpcMessageType[NpcMessageType["GET"] = 0] = "GET";
    NpcMessageType[NpcMessageType["ADD"] = 1] = "ADD";
    NpcMessageType[NpcMessageType["DELETE"] = 2] = "DELETE";
})(NpcMessageType = exports.NpcMessageType || (exports.NpcMessageType = {}));
var ChatMessageType;
(function (ChatMessageType) {
    ChatMessageType[ChatMessageType["SENDTOGRP"] = 0] = "SENDTOGRP";
})(ChatMessageType = exports.ChatMessageType || (exports.ChatMessageType = {}));
var MessagePeer;
(function (MessagePeer) {
    MessagePeer[MessagePeer["Host"] = 0] = "Host";
    MessagePeer[MessagePeer["Popup"] = 1] = "Popup";
    MessagePeer[MessagePeer["Content"] = 2] = "Content";
    MessagePeer[MessagePeer["Npc"] = 3] = "Npc";
    MessagePeer[MessagePeer["Chat"] = 4] = "Chat";
})(MessagePeer = exports.MessagePeer || (exports.MessagePeer = {}));
/* CustomMessages */ 


/***/ })
/******/ ]);