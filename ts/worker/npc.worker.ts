

import { Npc } from '../interface/npc.interface';
import { Message, MessageType, NpcMessageType, MessagePeer } from '../interface/message.interface';

export class NpcStorage {
    private ready: boolean;

    private npcs: Array<Npc>;

    constructor( ) {
        this.npcs = new Array<Npc>();
        this.ready = false;

        this.load( )
        .then( () => { this.ready = true; });
    }

    private load( ): Promise<void> {
        return new Promise<void>( ( resolve, reject ) => {
            let self = this;
            chrome.storage.sync.get( 'npcs', function( result ){
                if( !result['npcs'] ){
                    self.create()
                    return;
                }

                this.npcs = result['npcs'];
            });
        });
    }

    private create( ) {
        chrome.storage.sync.set({ 'npcs': new Array<Npc>(0) }, function(){ 
            
        });
    }

    public add( npc: Npc ): Promise<void> {
        return new Promise<void>( ( resolve, reject ) => {
            this.npcs.push( npc );
            chrome.storage.sync.set({ 'npcs': this.npcs }), function(){
                resolve();
            }
        });
    }

    public get( ): Promise<Array<Npc>> {
        return new Promise<Array<Npc>>( ( resolve, reject ) => {
            resolve( this.npcs );
        });
    }
}

var npcStorage: NpcStorage = new NpcStorage();
/* Worker Namespace */
var self = this;

self.onmessage = ( message: Message ) => {
    switch( message.type ){

        case NpcMessageType.ADD:

            npcStorage.add( message.content )
            .then( () => {
                self.postMessage( { guid: message.guid, type: MessageType.CONFIRMATION, sender: MessagePeer.Npc, receiver: MessagePeer.Host, content: undefined });
            });
            
            break;

        case NpcMessageType.GET:

            npcStorage.get()
            .then( ( npcs ) => {
                self.postMessage( { guid: message.guid, type: MessageType.CONFIRMATION, sender: MessagePeer.Npc, receiver: MessagePeer.Host, content: npcs } );
            });

            break;
    }
}

export { self };