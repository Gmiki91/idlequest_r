import { Item } from '../models/items/Item';

interface ItemWQty extends Item {
    qty:number;
} 

type ItemListProp = {
    itemList: Item[];
    showItemDetails: (item: Item) => void
}

export const ItemList = ({ itemList, showItemDetails }: ItemListProp) => {
    const tempList:ItemWQty[] = [];
    itemList.forEach(item=>{
        const duplicateElement = tempList.find(element=>element.name===item.name);
        if(duplicateElement){
            const index = tempList.indexOf(duplicateElement);
            tempList[index].qty += 1;
        }else{
            tempList.push({...item, qty:1})
        }
    })
    
    const listDisplayed = tempList.map(item => (<div
        key={item._id}
        onClick={() => showItemDetails(item)}>
        {item.name} x {item.qty}
    </div>)
    );

    return (<>{listDisplayed}</>);
}