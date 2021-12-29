import { Item } from '../models/items/Item';

type ItemListProp = {
    itemList: Item[];
    showItemDetails: (item: Item) => void
}

export const ItemList = ({ itemList, showItemDetails }: ItemListProp) => {
   
    
    const listDisplayed = itemList.map(item => (<div
        key={item._id}
        onClick={() => showItemDetails(item)}>
        {item.name}
    </div>)
    );

    return (<>{listDisplayed}</>);
}