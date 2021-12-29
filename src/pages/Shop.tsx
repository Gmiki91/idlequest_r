import axios from "axios";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { Item } from "../models/items/Item";
import { Card, type as CardType } from "../components/Card";
const userId = '61b8a1b9668c7872bc8b26e8';
const Shop = () => {
    const [market, setMarket] = useState<Item[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [cardType, setCardType] = useState<CardType>('Buy');
    const [item, setItem] = useState<Item>({} as Item);
    const [userItemList, setUserItemList] = useState<Item[]>([]);
    useEffect(() => {
        axios.get(`http://192.168.31.203:3030/api/items/`).then(response => setMarket(response.data.list));
        axios.get(`http://192.168.31.203:3030/api/users/${userId}`).then(response => setUserItemList(response.data.itemList));
    }, [])

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    }

    const prompt = (item: Item, type: CardType) => {
        toggleModal();
        setItem(item);
        setCardType(type);
        // await axios.post('http://192.168.31.203:3030/api/users/add', { item: item });
    }

    const confirmButtonClicked = async (item: Item) => {
        switch (cardType) {
            case 'Buy':
                console.log('buy');
                await axios.put('http://192.168.31.203:3030/api/users/buyItem', { item: item });
                break;
            case 'Sell':
                console.log('sell');
                await axios.put('http://192.168.31.203:3030/api/users/sellItem', { item: item });
                break;
        }
        toggleModal();
    }
    return <div style={{ marginTop: '10px' }}>
        <Modal
            className="Modal"
            appElement={document.getElementById('root') as HTMLElement}
            isOpen={showModal}
            onRequestClose={toggleModal}>
            <Card
                item={item}
                type={cardType}
                closeModal={toggleModal}
                confirmButton={(item) => confirmButtonClicked(item)}
            />
        </Modal>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {market.map(item => <div key={item._id} onClick={() => prompt(item, 'Buy')}>{item.name}</div>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {userItemList.map(item => <div key={item._id} onClick={() => prompt(item, 'Sell')}>{item.name}</div>)}
            </div>
        </div>
    </div>
}

export default Shop;