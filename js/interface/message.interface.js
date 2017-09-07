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
