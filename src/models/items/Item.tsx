export interface Item{
    _id: string;
    name:string;
    price: number;
    level: number;
    durability: number;
    qty:number;
    itemtype:'Armor' | 'Weapon'
}