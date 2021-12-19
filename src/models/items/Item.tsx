export interface Item{
    _id: string;
    name:string;
    pic:string; 
    price: number;
    level: number;
    durability: number;
    qty:number;
    type:'head' | 'body' | 'legs'|'foot'| 'oneHanded' | 'twoHanded' //| 'leftHand' |'rightHand';
}