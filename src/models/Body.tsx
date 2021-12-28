import { Item } from "./items/Item";

export interface Body{
    _id: string;
    name:string;
    pic:string;
    price:number;
    level:number;
    strength: number;
    dexterity: number;
    health: number;
    leftArm:boolean;
    rightArm:boolean;
    head:boolean;  
    xp:number;
    equipmentList:[Item];
}