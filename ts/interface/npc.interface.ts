
import { Point } from './point.interface';

export interface Npc {
    id: number;
    name: string;
    type: string;
    position: Point;
}