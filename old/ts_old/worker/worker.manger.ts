
/* comment out if not in test */
import { Worker } from 'webworker-threads';

import { WorkerType } from '../interface/worker.interface';
import { Message, MessageType, NpcMessageType, MessagePeer } from '../interface/message.interface';
import { Npc } from '../interface/npc.interface';

interface WorkerHolder {
    type: WorkerType,
    worker: Worker;
    promises: Array<MessagePromise>;
}

interface MessagePromise {
    guid: string;
    resolve: ( message: Message ) => void;
    reject: ( error: Error ) => void;
}

export class WorkerManager {
    public static WORKER_COUNT = 0;

    private workers: Array<WorkerHolder>;

    constructor( ){
        this.workers = new Array<WorkerHolder>();
    }

    public spawn( workerType: WorkerType ){
        let workerHolder: WorkerHolder;

        switch( workerType ){

            case WorkerType.Npc:

                workerHolder = {
                    type: WorkerType.Npc,
                    worker: new Worker( chrome.runtime.getURL( 'npc.worker.js' ) ),
                    promises: new Array<MessagePromise>()
                };

                workerHolder.worker.addEventListener( 'message', ( event ) => {
                    let message: Message = event.data;
                    let promise = workerHolder.promises.find( ( messagePromise ) => messagePromise.guid === message.guid );
        
                    promise ? promise.resolve( message ) : "";

                    // delete resolved promise ...
                });

                break;

            case WorkerType.Chat:

                workerHolder = {
                    type: WorkerType.Chat,
                    worker: new Worker( chrome.runtime.getURL( 'chat.worker.js' ) ),
                    promises: new Array<MessagePromise>()
                };


        }

        this.workers.push( workerHolder );

        WorkerManager.WORKER_COUNT++;
    }

    private generateGUID(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    public postMessage( message: Message ): Promise<Message>{
        var promise = new Promise<Message>( ( resolve, reject ) => {
            switch( message.receiver ){
                
                case MessagePeer.Npc: 
                    let workerHolder = this.workers.find( ( workerHolder ) => workerHolder.type == WorkerType.Npc );
                                
                    if( !workerHolder )
                         reject( new Error( 'WorkerManager: Worker not spawned' ) );
                    
                    // assign guid for async to promise pattern
                    let guid = this.generateGUID();
                    message.guid = guid;

                    workerHolder.worker.postMessage( message );
                    workerHolder.promises.push( { guid: guid, resolve: resolve, reject: reject });
                    break;
            }
        });
        return promise;
    }
}