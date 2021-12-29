import { Item } from "../models/items/Item";
import { Image } from "./Image"

export type type = 'Buy' | 'Sell' | 'Equip' | 'Unequip';

type CardProps = {
    item: Item,
    type: type,
    closeModal: () => void,
    confirmButton: (item: Item) => void,
}

export const Card = ({ item, type, confirmButton, closeModal }: CardProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 25, backgroundColor: 'rgba(56, 61, 69,0.7)', borderColor: 'black', borderWidth: 2, borderStyle: 'solid', borderRadius: 16 }}>
            <Image pic={item.pic} />
            <div>Name: {item.name}</div>
            <div>level: {item.level}</div>
            <div>price: {item.price}</div>
            <div>durability:{item.durability}</div>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={() => confirmButton(item)}>{type}</button>
        </div>
    )

}