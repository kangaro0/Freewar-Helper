"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_manger_1 = require("../worker/worker.manger");
const worker_interface_1 = require("../interface/worker.interface");
var workerManager = new worker_manger_1.WorkerManager();
function init() {
    workerManager.spawn(worker_interface_1.WorkerType.Npc);
    workerManager.spawn(worker_interface_1.WorkerType.Chat);
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    workerManager.postMessage(message)
        .then((response) => {
        if (response)
            sendResponse(response);
    });
});
init();
