import { Item } from "./Item";

export interface Weapon extends Item{
    type: 'ONE_HANDED' | 'TWO_HANDED';
    hand:'LEFT' | 'RIGHT';
    dmg: number;
}