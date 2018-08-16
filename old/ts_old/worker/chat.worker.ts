
import { Queue } from '../misc/queue';

import { Message, MessageType, ChatMessageType, MessagePeer } from '../interface/message.interface';

interface WorkerInstance {
    onmessage: ( message: Message ) => void;
    postMessage: ( message: Message ) => void;
}

export class ChatManager {

    private queue: Queue<Message>;
    private instance: WorkerInstance;
    private tab: chrome.tabs.Tab;
    private ready: boolean;
    private interval: number;

    constructor( workerInstance: WorkerInstance ){
        this.instance = workerInstance;

        this.queue = new Queue<Message>();
        this.ready = false;
    }

    private init(): Promise<void> {
        return new Promise<void>( ( resolve, reject ) => {
            this.getTab()
            .then( ( tab ) => {
                this.tab = tab;
                resolve();
            })
            .catch( ( error ) => {
                reject( error );
            });
        });
    }

    private getTab(): Promise<chrome.tabs.Tab> {
        return new Promise<chrome.tabs.Tab>( ( resolve, reject ) => {
            chrome.tabs.query({}, function( tabs: chrome.tabs.Tab[] ){
                var expression = /https:\/\/welt[0-9]{1,2}.freewar.de/;
                var regexp = new RegExp(expression);
                for(var i = 0; i < tabs.length; i++){
                    if(tabs[i].url && regexp.test(tabs[i].url)){
                        resolve( tabs[i] );
                    }
                }
                reject( new Error( 'ChatManager: Tab not found.' ) );
            });
        });
    }

    private initSendingInterval(){
        this.interval = setInterval( () => {
            if( !this.ready )
                return;
            let message: Message;

            var self = this;
            while( message = this.queue.dequeue() ){
                chrome.tabs.sendMessage( this.tab.id, message, function( response: Message ){
                    self.instance.postMessage( response );
                });
            }
        }, 1000 );
    }

    public sendMessage( message: Message ): void {
        this.queue.enqueue( message );
    }
}

var self = this;

let chatManager = new ChatManager( self );

self.onmessage = ( message: Message ) => {
    chatManager.sendMessage( message );
};