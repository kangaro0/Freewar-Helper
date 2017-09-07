
var chai = require('chai');
var assert = chai.assert;
var chrome = require('sinon-chrome');

var Popup = require('../js/popup/popup').Popup;
var MessageType = require('../js/interface/message.interface').MessageType;
var MessagePeer = require('../js/interface/message.interface').MessagePeer;

describe( 'popup.js', function(){

    before( function( ){
        global.chrome = chrome;
    });

    beforeEach( function(){
        chrome.runtime.sendMessage.flush();
    });

    it( 'should initialize', function(){
        this.popup = new Popup();
        
        assert.notEqual( this.popup, null );
    });

    it( 'should request npcs from background', function( done ){

        // setup response message from background script
        var responseMessage = {
            type: MessageType.CONFIRMATION,
            sender: MessagePeer.Npc,
            receiver: MessagePeer.Popup,
            content: [
                {
                    id: 1,
                    name: 'Wiederwaertiges Biest',
                    type: 'Unique-NPC',
                    position: { x: 5, y: 7 }
                }
            ]
        };
        chrome.runtime.sendMessage.yields( responseMessage );

        this.popup.init()
        .then( () => {
            assert.ok( chrome.runtime.sendMessage.calledOnce );
            done();
        });
    });

    it( 'should save received npcs internally', function(){
        var npcs = this.popup.get();

        assert.notEqual( npcs, null );
        assert.notEqual( npcs[0], null );
        assert.equal( npcs[0].id, 1);
    });

    after( function(){
        chrome.flush();
        delete global.chrome;
    });
});


