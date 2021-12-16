import { Item } from "./Item";

export interface Armor extends Item{
    type: 'HEAD' | 'BODY' | 'LEFT_ARM' | 'RIGHT_ARM';
}