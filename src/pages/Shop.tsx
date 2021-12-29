import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../models/items/Item";

const Shop = () => {
    const [market, setMarket] = useState<Item[]>([]);

    useEffect(() => {
        axios.get(`http://192.168.31.203:3030/api/items/`).then(response => {
            setMarket(response.data.list);
        });
    }, [])

    const addItem=(item:Item)=>{
        console.log(item);
        // await axios.post('http://192.168.31.203:3030/api/users/add', { item: item });
    }

    return <div style={{ marginTop: '10px' }}>
        {market.map(item => <div key={item._id} onClick={() => addItem(item)}>{item.name}</div>)}
    </div>
}

export default Shop;