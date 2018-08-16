
import { WorkerManager } from '../worker/worker.manger';

import { WorkerType } from '../interface/worker.interface';
import { Message, MessageType } from '../interface/message.interface';
import { Npc } from '../interface/npc.interface';
import { Point } from '../interface/point.interface';

var workerManager = new WorkerManager();

function init( ){
    workerManager.spawn( WorkerType.Npc );
    workerManager.spawn( WorkerType.Chat );
}

chrome.runtime.onMessage.addListener( function( message: Message, sender, sendResponse ) {
    workerManager.postMessage( message )
    .then( ( response: Message ) => {
        if( response )
            sendResponse( response );
    });
});

init();