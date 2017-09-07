var chai = require('chai');
var assert = chai.assert;
var chrome = require('sinon-chrome');

var Storage = require('../js/storage/storage').Storage;

describe( 'storage.ts', function(){

    it( 'should initialize', function(){
        this.storage = new Storage();
        assert.notEqual( this.storage, null );
    })

    it( 'should store and emit single item', function(){
        var item = {
            id: 0, 
            name: 'bla',
            type: 'beschde',
            position: {
                x: 5,
                y: 7
            }
        };

        this.storage.add( item );

        var recItem = this.storage.getAll();

        assert.equal( recItem[0], item );
    });

    it( 'should answer by item id', function(){
        var item = this.storage.getById( 0 );

        assert.equal( item.id, 0 );
    });

    it( 'should accept whole array of items', function(){
        var items = [
            {
                id: 0
            },
            {
                id: 1
            }
        ];

        this.storage.set( items );

        var item = this.storage.getById( 0 );
        assert.equal( item, items[0] );
    });
});

