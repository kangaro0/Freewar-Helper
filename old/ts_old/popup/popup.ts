
import { Storage } from '../storage/storage';

import { PopupDataType } from '../interface/popup.interface';
import { Npc } from '../interface/npc.interface';
import { Message, MessageType, NpcMessageType, ChatMessageType, MessagePeer } from '../interface/message.interface';

export class Popup {

    private npcStorage: Storage<Npc>;
    private npcElement: string;

    constructor( ){
        this.npcStorage = new Storage<Npc>();
    }

    public init( ): Promise<void> {
        return new Promise<void>( ( resolve, reject ) => {
            this.initStorages( )
            .then( () => {
                resolve();
            });
        });
    }

    private initStorages(): Promise<void>{
        return new Promise<void>( ( resolve, reject ) => {
            Promise.all([
                this.load( PopupDataType.NPC )
            ])
            .then( ( data ) => {
                this.npcStorage.set( data[0] );
                resolve();
            });
        });
    }

    private draw( type: PopupDataType ){
        switch( type ){

            case PopupDataType.NPC:

                var npcs = this.npcStorage.getAll( );
            
                var i = 0, max = npcs.length;
                for( ; i < max ; i++ ){
                    
                }
                break;
        }
    }

    private load( type: PopupDataType ): Promise<any>{
        return new Promise<any>( ( resolve, reject ) => {
            let message: Message;

            switch( type ){
                
                case PopupDataType.NPC: 

                    message = {
                        type: NpcMessageType.GET,
                        sender: MessagePeer.Popup,
                        receiver: MessagePeer.Npc
                    }
                    break;
            }

            chrome.runtime.sendMessage( message, function( response: Message ){
                if( response.type === MessageType.CONFIRMATION )
                    resolve( response.content );
                reject( response.content );
            });
        });
    }

    public sendToGroup( content: string ): Promise<boolean>{
        return new Promise<boolean>( ( resolve, reject ) => {
            let message: Message = {
                type: ChatMessageType.SENDTOGRP,
                sender: MessagePeer.Popup,
                receiver: MessagePeer.Chat,
                content: content
            };
            
            chrome.runtime.sendMessage( message, function( response: Message ){
                if( response.type === MessageType.CONFIRMATION ){
                    resolve( true );
                    return;    
                }
                reject( response.content );
            });
        });
    }

    public get( ){
        return this.npcStorage.getAll();
    }

    public delete( type: PopupDataType.NPC, id?: number ): Promise<boolean> {
        return new Promise<boolean>( ( resolve, reject ) => {
            let message: Message;
            let deleteFromStorage = false;

            switch( type ){

                case PopupDataType.NPC: 

                    message = {
                        type: NpcMessageType.DELETE,
                        sender: MessagePeer.Popup,
                        receiver: MessagePeer.Npc,
                        content: id
                    }

                    deleteFromStorage = true;
                    break;
            }

            var self = this;

            chrome.runtime.sendMessage( message, function( response: Message ) {
                if( response.type === MessageType.CONFIRMATION ){
                    if( deleteFromStorage )
                        self.deleteFromStorage( type, id )
                        .then( () => {
                            resolve( true );
                        });
                    else resolve( true );
                }
                reject( response.content );
            });
        });
    }

    private deleteFromStorage( type: PopupDataType, id: number ){
        return new Promise<void>( ( resolve, reject ) => {
            switch( type ){
                
                case PopupDataType.NPC: 
                
                    this.npcStorage.delete( id );
                    break;
            }
            resolve( );
        });
    }
}