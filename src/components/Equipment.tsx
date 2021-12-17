import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../models/items/Item';
import { Armor } from '../models/items/Armor';
import { ItemWrapper } from '../models/wrappers/ItemWrapper';
import { Weapon } from '../models/items/Weapon';

type EquipmentProp = {
    equipment: ItemWrapper[];
    showItemDetails : (item:Item)=>void;
}

type ArmorSet = {
    'head':Armor;
    'body':Armor;
    'leftArm':Armor;
    'rightArm':Armor;
}

export const Equipment = (props: EquipmentProp) => {
    const [armorSet, setArmorSet] = useState<ArmorSet>({} as ArmorSet);
    const [leftWeapon, setLeftWeapon] = useState<Item>({}as Item);
    const [rightWeapon, setRightWeapon] = useState<Item>({}as Item);

    useEffect(() => {
        const ids: string[] = props.equipment.map(equipment => equipment._id);
        axios.get(`http://192.168.31.203:3030/api/items/${ids}`).then(response => {
            response.data.items.forEach((item:Item) => {
                const itemWrapper = props.equipment.find(equipment => item._id === equipment._id);
                const updatedItem = { ...item, ...itemWrapper };
                sortEquipment(updatedItem);
            });
        });
    }, [props.equipment]);

    const sortEquipment = (equipment: Item) => {
        if (equipment.itemtype === 'Armor') {
            const armor = equipment as Armor;
            const newEquipmentSet = {...armorSet}
            newEquipmentSet[armor.type] = armor;
            setArmorSet(newEquipmentSet);
        } else {
            const weapon = equipment as Weapon;
            if (weapon.type === 'twoHanded') {
                setLeftWeapon(weapon);
                setRightWeapon(weapon);
            } else if (weapon.hand === 'left') {
                setLeftWeapon(weapon);
            } else if (weapon.hand === 'right') {
                setRightWeapon(weapon);
            }
        }
    }
    
    return (
    <ul>
        <li onClick={()=>props.showItemDetails(armorSet.head)}>Head: {armorSet.head?.name}</li>
        <li>Body: {armorSet.body?.name}</li>
        <li>Left arm: {armorSet.leftArm?.name}</li>
        <li>Right arm: {armorSet.rightArm?.name}</li>
        <li onClick={()=>props.showItemDetails(leftWeapon)} >Left hand weapon : {leftWeapon?.name}</li>
        <li onClick={()=>props.showItemDetails(rightWeapon)} >Right hand weapon : {rightWeapon?.name}</li>
    </ul>
    );
}