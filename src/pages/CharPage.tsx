import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import './CharPage.css';
import { Equipment } from "../components/Equipment";
import { Image } from "../components/Image";
import { Stats } from "../components/Stats";
import { User } from '../models/User';
import { Body } from '../models/Body'
import { ItemList } from '../components/ItemList';
import { Card, type as CardType } from '../components/Card';
import { Item } from '../models/items/Item';

const userId = '61b8a1b9668c7872bc8b26e8';

const CharPage = () => {

    //console.log('[CharPage] render');
    const [data, setData] = useState<{ user: User, bodies: Body[] } | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [item, setItem] = useState<Item>({} as Item);
    const [cardType, setCardType] = useState<CardType>('Buy');

    const loadUser = useCallback(async () => {
        const user = await axios.get<User>(`http://192.168.31.203:3030/api/users/${userId}`).then(response => response.data);
        const bodies = user.bodyList;//await axios.get<{status:string, bodies:Body[]}>(`http://192.168.31.203:3030/api/bodies/${userData.bodyList}`).then(response => response.data.bodies);
        setData({ user: user, bodies: bodies });
    }, []);

    useEffect(() => {
        loadUser();
    }, [showModal, loadUser])

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    }

    const itemPopUp = (item: Item, type:CardType) => {
            setItem(item);
            setCardType(type);
            toggleModal();
        
    }

    const confirmButtonClicked = async (item: Item) => {
        console.log('confirmbuttonclicked ',cardType);
        switch (cardType) {
            case 'Equip':
                await axios.put('http://192.168.31.203:3030/api/users/equip', { item: item });
                break;
            case 'Unequip':
                await axios.put('http://192.168.31.203:3030/api/users/unequip', { item: item });
                break;
        }
        toggleModal();
    }

    return (data ?
        <div className="Container">
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
            <div className="FirstRow">
                <Stats
                    strength={data.bodies[0].strength}
                    dexterity={data.bodies[0].dexterity}
                    health={data.bodies[0].health} />
                <Image pic={data.bodies[0].pic} />
                <Equipment
                    equipment={data.bodies[0].equipmentList}
                    showItemDetails={(item) => itemPopUp(item, 'Unequip')} />
            </div>
            <div className="SecondRow">
                <ItemList itemList={data.user.itemList}
                    showItemDetails={(item) => itemPopUp(item, 'Equip')} />
            </div>
        </div>
        : <div>spinner</div>
    )
}

export default CharPage;

/*
  
*/