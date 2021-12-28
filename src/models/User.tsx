import { Body } from "./Body";
import { Item } from "./items/Item";

export interface User {
    _id: string;
    email: string;
    name: string;
    money:number;
    leftHand:Item;
    rightHand:Item;
    bodyList: Body[];
    itemList: Item[];
}