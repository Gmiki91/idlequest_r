export interface Item{
    _id: string;
    name:string;
    pic:string; 
    price: number;
    level: number;
    durability: number;
    type:'head' | 'body' | 'legs'|'foot' | 'twoHanded' | 'leftHand' |'rightHand';
}