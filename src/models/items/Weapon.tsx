import { Item } from "./Item";

export interface Weapon extends Item{
    type: 'oneHanded' | 'twoHanded';
    hand:'left' | 'right' | 'none';
    damage: number;
}