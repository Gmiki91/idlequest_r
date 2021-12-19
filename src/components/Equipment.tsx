import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../models/items/Item';
import { ItemWrapper } from '../models/wrappers/ItemWrapper';

type EquipmentProp = {
    equipment: ItemWrapper[];
    showItemDetails: (item: Item) => void;
}
type EquipmentSet = {
    'head': Item;
    'body': Item;
    'legs': Item;
    'foot': Item;
    'leftHand':Item;
    'rightHand':Item;
}

export const Equipment = ({equipment, showItemDetails}: EquipmentProp) => {
    const [equipmentSet, setEquipmentSet] = useState<EquipmentSet>({} as EquipmentSet);

    useEffect(() => {
        const ids: string[] = equipment.map(equipment => equipment._id);
        if(ids.length > 0) {
        axios.get(`http://192.168.31.203:3030/api/items/${ids}`).then(response => {
            const items:Item[] = response.data.items;
            let newEquipmentSet = { ...equipmentSet };
            items.forEach(item=>{
                if(item.type==='oneHanded'){
                    const itemWrapper = equipment.find(equipment => item._id === equipment._id); //check which hand holds the item
                    newEquipmentSet[itemWrapper!.type]=item; //adding weapon to the correct hand
                }else if(item.type==='twoHanded'){
                    newEquipmentSet['leftHand']=item; //adding weapon to both hands
                    newEquipmentSet['rightHand']=item; //adding weapon to both hands
                }else{
                    newEquipmentSet[item.type]=item; //armor item.type and equipment.type is the same
                }
            });
            setEquipmentSet(newEquipmentSet);
        });
    }}, [equipment]);

    return (
        <ul>
            <li onClick={() => showItemDetails(equipmentSet.head)}>Head: {equipmentSet.head?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.body)}>Body: {equipmentSet.body?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.legs)}>Legs: {equipmentSet.legs?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.foot)}>Feet: {equipmentSet.foot?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.rightHand)} >Left hand weapon : {equipmentSet.rightHand?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.leftHand)} >Right hand weapon : {equipmentSet.leftHand?.name}</li>
        </ul>
    );
}