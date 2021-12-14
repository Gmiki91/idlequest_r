import { Item } from "./Item";

export interface Weapon extends Item{
    type: 'ONE_HANDED' | 'TWO_HANDED';
    dmg: number;
}