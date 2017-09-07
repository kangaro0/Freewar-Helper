"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* comment out if not in test */
const webworker_threads_1 = require("webworker-threads");
const worker_interface_1 = require("../interface/worker.interface");
const message_interface_1 = require("../interface/message.interface");
class WorkerManager {
    constructor() {
        this.workers = new Array();
    }
    spawn(workerType) {
        let workerHolder;
        switch (workerType) {
            case worker_interface_1.WorkerType.Npc:
                workerHolder = {
                    type: worker_interface_1.WorkerType.Npc,
                    worker: new webworker_threads_1.Worker(chrome.runtime.getURL('npc.worker.js')),
                    promises: new Array()
                };
                workerHolder.worker.addEventListener('message', (event) => {
                    let message = event.data;
                    let promise = workerHolder.promises.find((messagePromise) => messagePromise.guid === message.guid);
                    promise ? promise.resolve(message) : "";
                    // delete resolved promise ...
                });
                break;
            case worker_interface_1.WorkerType.Chat:
                workerHolder = {
                    type: worker_interface_1.WorkerType.Chat,
                    worker: new webworker_threads_1.Worker(chrome.runtime.getURL('chat.worker.js')),
                    promises: new Array()
                };
        }
        this.workers.push(workerHolder);
        WorkerManager.WORKER_COUNT++;
    }
    generateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    postMessage(message) {
        var promise = new Promise((resolve, reject) => {
            switch (message.receiver) {
                case message_interface_1.MessagePeer.Npc:
                    let workerHolder = this.workers.find((workerHolder) => workerHolder.type == worker_interface_1.WorkerType.Npc);
                    if (!workerHolder)
                        reject(new Error('WorkerManager: Worker not spawned'));
                    // assign guid for async to promise pattern
                    let guid = this.generateGUID();
                    message.guid = guid;
                    workerHolder.worker.postMessage(message);
                    workerHolder.promises.push({ guid: guid, resolve: resolve, reject: reject });
                    break;
            }
        });
        return promise;
    }
}
WorkerManager.WORKER_COUNT = 0;
exports.WorkerManager = WorkerManager;
