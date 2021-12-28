import { Item } from '../models/items/Item';

type EquipmentProp = {
    equipment: Item[];
    showItemDetails: (item: Item) => void;
}
type EquipmentSet = {
    'head': Item;
    'body': Item;
    'legs': Item;
    'foot': Item;
    'leftHand': Item;
    'rightHand': Item;
}

export const Equipment = ({ equipment, showItemDetails }: EquipmentProp) => {

    //console.log("[Equipment] render");

    const equipmentSet = {} as EquipmentSet;
    equipment.forEach(item => {
        if (item.type === 'twoHanded') {
            equipmentSet['leftHand'] = item; //adding weapon to both hands
            equipmentSet['rightHand'] = item; //adding weapon to both hands
        } else {
            equipmentSet[item.type] = item; //armor item.type and equipment.type is the same
        }
    });

    return (
        <ul>
            <li onClick={() => showItemDetails(equipmentSet.head)}>Head: {equipmentSet.head?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.body)}>Body: {equipmentSet.body?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.legs)}>Legs: {equipmentSet.legs?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.foot)}>Feet: {equipmentSet.foot?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.rightHand)} >Right hand: {equipmentSet.rightHand?.name}</li>
            <li onClick={() => showItemDetails(equipmentSet.leftHand)} >Left hand: {equipmentSet.leftHand?.name}</li>
        </ul>
    );
}