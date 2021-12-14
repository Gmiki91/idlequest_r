export interface Body{
    _id: string;
    name:string;
    pic:string;
    strength: number;
    dexterity: number;
    health: number;
    leftArm:boolean;
    rightArm:boolean;
    head:boolean;
    headEquipment:string| null;
    leftArmEquipment:string| null;
    rightArmEquipment:string| null;
    bodyEquipment:string| null;
    leftWeapon:string| null;
    rightWeapon:string | null;
    price:number;
    level:number;
}