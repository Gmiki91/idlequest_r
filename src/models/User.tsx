import { BodyWrapper } from "./wrappers/BodyWrapper";
import { ItemWrapper } from "./wrappers/ItemWrapper";

export interface User {
    _id: string;
    email: string;
    name: string;
    money:number;
    level:number;
    leftHand:ItemWrapper;
    rightHand:ItemWrapper;
    body: BodyWrapper ;
    bodyList: [BodyWrapper];
    itemList: [ItemWrapper];
    equipmentList:[ItemWrapper];
}