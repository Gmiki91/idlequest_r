export interface User {
    _id: string;
    email: string;
    name: string;
    bodyId: string ;
    itemIdList: [string] | null;
    bodyIdList: [string] | null;
    money:number;
    level:number;
}