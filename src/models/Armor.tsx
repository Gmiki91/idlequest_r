import { Item } from "./Item";

export interface Weapon extends Item{
    type: 'HEAD' | 'BODY' | 'LEFT_ARM' | 'RIGHT_ARM';
    health: number;
}