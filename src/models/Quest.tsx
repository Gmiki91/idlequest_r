export interface Quest{
    _id: string;
    fightChance: number;
    trapChance:number;
    money:number;
    level:number;
    bodyId?:string;
    trapDexterity?:number;
    item?:string;
}