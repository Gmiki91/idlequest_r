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
import { Card } from '../components/Card';
import { Item } from '../models/items/Item';

const userId = '61b8a1b9668c7872bc8b26e8';

const CharPage = () => {

    //console.log('[CharPage] render');
    const [data, setData] = useState<{ user: User, bodies:Body[]} | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [itemDetails, setItemDetails] = useState<Item>({} as Item);
    const [market, setMarket] = useState<Item[]>([]);

    const loadUser = useCallback(async () => {
          axios.get(`http://192.168.31.203:3030/api/items/`).then(response=>{
              if(market.length === 0){
                  setMarket(response.data.list);
              }
          });
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

    const itemPopUp = (item: Item) => {
        if (item) {
            setItemDetails(item);
            toggleModal();
        }
    }

    const equipItem = useCallback(async (item: Item) => {
        await axios.put('http://192.168.31.203:3030/api/users/equip', { item: item });
        toggleModal();
    }, []);

    const unequipItem = useCallback(async (item: Item) => {
        await axios.put('http://192.168.31.203:3030/api/users/unequip', { item: item });
        toggleModal();
    }, []);

    const addItem = useCallback(async (item: Item) => {
        await axios.post('http://192.168.31.203:3030/api/users/add', { item: item });
        
    }, []);

    return (data ?
        <div className="Container">
            <button onClick={toggleModal}>Click</button>
            <Modal
                className="Modal"
                appElement={document.getElementById('root') as HTMLElement}
                isOpen={showModal}
                onRequestClose={toggleModal}>
                <Card
                    details={itemDetails}
                    closeModal={toggleModal}
                    equip={(item) => equipItem(item)}
                    unequip={(item) => unequipItem(item)}
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
                    showItemDetails={(item) => itemPopUp(item)} />
            </div>
            <div className="SecondRow">
                <ItemList itemList={data.user.itemList}
                    showItemDetails={(item) => itemPopUp(item)} />

            </div>
            <div style={{ marginTop: '10px' }}>
                {market.map(item => <div key={item._id} onClick={() => addItem(item)}>{item.name}</div>)}
            </div>
        </div>
        : <div>spinner</div>
    )
}

export default CharPage;

/*
  
*/