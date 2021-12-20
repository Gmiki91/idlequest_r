import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '../models/items/Item';
import { ItemWrapper } from "../models/wrappers/ItemWrapper";

type ItemListProp = {
    itemList: ItemWrapper[];
    showItemDetails: (item: Item) => void
}
export const ItemList = ({ itemList, showItemDetails }: ItemListProp) => {
    const [list, setList] = useState<Item[]>([]);
    const ids: string[] = itemList.map(item => item._id);

    useEffect(() => {
        const updatedItems:Item[] = [];
        axios.get(`http://192.168.31.203:3030/api/items/${ids}`).then(response => {
            itemList.forEach(userItem => {
                const item = response.data.items.find((item: Item) => item._id === userItem._id);
                const updatedItem = { ...item, qty: userItem.qty };
                updatedItems.push(updatedItem);
            });
            setList([...updatedItems]);
        });
    }, [itemList]);

    const listDisplayed = list.map(item => (<div
        key={item._id}
        onClick={() => showItemDetails(item)}>
        {item.name}
    </div>)
    );

    return (<>{listDisplayed}</>);
}