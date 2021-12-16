import { Item } from "./Item";

export interface Armor extends Item{
    type: 'head' | 'body' | 'leftArm' | 'rightArm';
}