import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../models/items/Item';
import { Armor } from '../models/items/Armor';
import { ItemWrapper } from '../models/wrappers/ItemWrapper';
import { Weapon } from '../models/items/Weapon';

type EquipmentProp = {
    equipment: ItemWrapper[]
}

export const Equipment = (props: EquipmentProp) => {
    const [head, setHead] = useState<Item>();
    const [body, setBody] = useState<Item>();
    const [leftArm, setLeftArm] = useState<Item>();
    const [rightArm, setRightArm] = useState<Item>();
    const [leftWeapon, setLeftWeapon] = useState<Item>();
    const [rightWeapon, setRightWeapon] = useState<Item>();

    useEffect(() => {
        const ids: string[] = props.equipment.map(equipment => equipment._id);
        axios.get(`http://192.168.31.203:3030/api/items/${ids}`).then(response => {
            response.data.items.forEach((item:Item) => {
                const itemWrapper = props.equipment.find(equipment => item._id === equipment._id);
                const updatedItem = { ...item, ...itemWrapper };
                sortEquipment(updatedItem);
            });
        });
    }, [props.equipment])

    const sortEquipment = (equipment: Item) => {
        if (equipment.itemtype === 'Armor') {
            const armor = equipment as Armor;
            switch (armor.type) {
                case 'head': setHead(armor);
                    break;
                case 'body': setBody(armor);
                    break;
                case 'leftArm': setLeftArm(armor);
                    break;
                case 'rightArm': setRightArm(armor);
                    break;
                default: break;
            }
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
    return (<ul>
        <li>Head: {head?.name}</li>
        <li>Body: {body?.name}</li>
        <li>Left arm: {leftArm?.name}</li>
        <li>Right arm: {rightArm?.name}</li>
        <li>Weapon : {rightWeapon?.name}</li>
        <li>Weapon : {leftWeapon?.name}</li>
    </ul>);
}