
export enum MessageType {
    CONFIRMATION,
    ERROR
}

export enum NpcMessageType {
    GET,
    ADD,
    DELETE
}

export enum ChatMessageType {
    SENDTOGRP
}

export enum MessagePeer {
    Host,
    Popup,
    Content,
    Npc,
    Chat
}

export interface Message {
    type: MessageType | NpcMessageType | ChatMessageType;
    sender: MessagePeer;
    receiver: MessagePeer;
    content?: any;
    guid?: string;
}

/* CustomMessages */