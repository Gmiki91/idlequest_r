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

    const [user, setUser] = useState<User | null>(null);
    const [body, setBody] = useState<Body | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [itemDetails, setItemDetails] = useState<Item>({} as Item);
    const [market, setMarket] = useState<Item[]>([]);

    const loadUser = useCallback(async () => {
        axios.get(`http://192.168.31.203:3030/api/items/`).then(response=>{
            if(market.length === 0){
                console.log(response.data.list);
                setMarket(response.data.list);
            }
        });
        const userData = await axios.get<User>(`http://192.168.31.203:3030/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
                return response.data;
            });
        axios.get<Body>(`http://192.168.31.203:3030/api/bodies/${userData.body._id}`)
            .then(result => setBody({ ...result.data, ...userData.body })); //updating database Body with user Body 
    }, [market]);

    useEffect(() => {
        console.log(market);
        loadUser();
    }, [loadUser, market])

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    }

    const itemPopUp = (item: Item) => {
        setItemDetails(item);
        toggleModal();
    }

    const equipItem = useCallback(async (item: Item) => {
        await axios.put('http://192.168.31.203:3030/api/users/equip', { item: item });
        loadUser();
    }, [loadUser]);

    const unequipItem = useCallback(async (item: Item) => {
        await axios.put('http://192.168.31.203:3030/api/users/unequip', { item: item });
        loadUser();
    }, [loadUser]);

    const addItem = useCallback(async (item: Item) => {
        await axios.post('http://192.168.31.203:3030/api/users/add', { item: item });
        loadUser();
    }, [loadUser]);
   
    return (body && user ?
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
                    strength={body.strength}
                    dexterity={body.dexterity}
                    health={body.health} />
                <Image pic={body.pic} />
                <Equipment
                    equipment={user.equipmentList}
                    showItemDetails={(item) => itemPopUp(item)} />
            </div>
            <div className="SecondRow">
                <ItemList itemList={user.itemList}
                    showItemDetails={(item) => itemPopUp(item)} />
                    
            </div>
            <div style={{marginTop: '10px'}}>
            {market.map(item =><div key={item._id} onClick={()=>addItem(item)}>{item.name}</div>)}
            </div>
        </div>
        : <div>spinner</div>
    )
}

export default CharPage;