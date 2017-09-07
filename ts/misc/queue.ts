
export class Queue<T> {

    private items: Array<T>;
    private count: number;

    constructor( ){
        this.items = new Array<T>();
    }

    public enqueue( item: T ){
        this.items.push( item );
        this.count++;
    }

    public dequeue( ){
        if( this.count === 0 )
            return undefined;

        let items = this.items.splice(0, 1);
        return items[ 0 ];
    }
}