type ItemListProp = {
    itemList: string[] | null;
}

export const ItemList = (props: ItemListProp) => {
    const items = props.itemList;
    const list = items ? items.map(item => <p>{item}</p>) : null;
    return (<>
        {list}
    </>);
}