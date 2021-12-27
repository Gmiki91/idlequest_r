import { Body } from "./Body";
import { ItemWrapper } from "./wrappers/ItemWrapper";

export interface User {
    _id: string;
    email: string;
    name: string;
    money:number;
    leftHand:ItemWrapper;
    rightHand:ItemWrapper;
    bodyIdList: string[];
    itemList: ItemWrapper[];
}