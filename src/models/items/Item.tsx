export interface Item{
    _id: string;
    name:string;
    pic:string;
    price: number;
    level: number;
    durability: number;
    itemtype:'Armor' | 'Weapon'
}