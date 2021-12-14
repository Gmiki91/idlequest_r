type EquipmentProp ={
    headEquipment:string| null;
    leftArmEquipment:string| null;
    rightArmEquipment:string| null;
    bodyEquipment:string| null;
    leftWeapon:string| null;
    rightWeapon:string | null;
}

export const Equipment = (props:EquipmentProp) => (<ul>
    <li>Sisak: Nincs</li>
    <li>Páncél: Szakadt barna rongy</li>
    <li>Saru: Vacak cipő</li>
</ul>);