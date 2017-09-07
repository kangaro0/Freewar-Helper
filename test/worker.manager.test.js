
var chai = require('chai');
var assert = chai.assert;
var chrome = require('sinon-chrome');

var Worker = require('webworker-threads').Worker;

var WorkerManager = require('../js/worker/worker.manger').WorkerManager;
var WorkerType = require('../js/interface/worker.interface').WorkerType;
var MessageType = require('../js/interface/message.interface').MessageType;
var NpcMessageType = require('../js/interface/message.interface').NpcMessageType;
var MessagePeer = require('../js/interface/message.interface').MessagePeer;

describe( 'worker.manager.js', function(){

    beforeEach( function(){
        global.chrome = chrome;

    });

    it( 'should initialize', function(){
        this.workerManager = new WorkerManager();

        assert.notEqual( this.workerManager, null );
    });

    it( 'should spawn worker', function(){
        this.workerManager.spawn( WorkerType.Npc );

        var worker = this.workerManager.workers[ 0 ];
        assert.notEqual( worker, null );
    })

    it( 'should post a message to a worker', function( done ){
        var npc = {
            id: 0,
            name: 'Biest',
            type: 'NPC',
            position: {
                x: 5,
                y: 7
            }
        };

        var message = {
            type: NpcMessageType.ADD,
            sender: MessagePeer.Content,
            receiver: MessagePeer.Npc,
            content: npc
        };

        var responseMessage = {
            type: MessageType.CONFIRMATION,
            sender: MessagePeer.Npc,
            receiver: MessagePeer.Popup,
            content: null
        };
        chrome.runtime.sendMessage.yields( responseMessage );

        this.workerManager.postMessage( message )
        .then( ( response ) => { 
            assert.equal( response.type, MessageType.CONFIRMATION );
            done();
        });
    })

    after( function(){
        delete global.chrome;
    });

});