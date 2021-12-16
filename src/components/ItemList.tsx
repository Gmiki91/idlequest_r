import axios from 'axios';
import { Item } from '../models/items/Item';
import { ItemWrapper } from "../models/wrappers/ItemWrapper";

type ItemListProp = {
    itemList: ItemWrapper[];
}

export const ItemList = ({ itemList }: ItemListProp) => {
    const ids: string[] = itemList.map(item => item._id);
    const list: JSX.Element[] = [];
    axios.get(`http://192.168.31.203:3030/api/items/${ids}`).then(response => {
        response.data.items.forEach((item: Item) => {
            list.push(<p key={item._id}>{item.name}</p>);
        });
    });

    return (<>{list}</>);
}