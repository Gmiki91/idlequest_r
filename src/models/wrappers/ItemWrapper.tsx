export interface ItemWrapper {
    _id: string;
    durability: number;
    qty: number;
    type: 'head' | 'body' | 'legs' | 'foot' | 'leftHand' | 'rightHand'
}