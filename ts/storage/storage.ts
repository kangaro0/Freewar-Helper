
import { DataItem } from '../interface/storage.interface';

export class Storage<T extends DataItem> {
    private items: Array<T>;
    
    constructor( ) {
        this.items = new Array<T>();
    }
    
    public set( items: Array<T> ) {
        this.items = items;
    }

    public add( item: T ){
        this.items.push( item );
    }
    
    public getAll( ): Array<T> {
        return this.items;
    }

    public getById( id: number ): T {
        return this.items.find( item => item.id === id );
    }
    
    public delete( id: number ) {
        let index = this.items.indexOf( this.items.find( ( npc ) => npc.id === id ) );
    
        if( index === -1 )
            return;
    
        this.items.splice( index, 1 );
    }
}