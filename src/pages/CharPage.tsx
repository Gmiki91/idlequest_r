import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Equipment } from "../components/Equipment";
import { Image } from "../components/Image";
import { Stats } from "../components/Stats";
import { User } from '../models/User';
import { Body } from '../models/Body'
import './CharPage.css';
import { ItemList } from '../components/ItemList';

const userId = '61b8a1b9668c7872bc8b26e8';

const CharPage = () => {

    const [user, setUser] = useState<User | null>(null);
    const [body, setBody] = useState<Body | null>(null);

    const init = useCallback(async () => {
        const userData = await axios.get<User>(`http://192.168.31.203:3030/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
                return response.data;
            });
        axios.get<Body>(`http://192.168.31.203:3030/api/bodies/${userData.body._id}`)
            .then(result => setBody({ ...result.data, ...userData.body })); //updating database Body with user Body 
    }, []);

    useEffect(() => {
        init();
    },[init])

   
    return (body && user ?
        <div className="Container">
            <div className="FirstRow">
                <Stats
                    strength={body.strength}
                    dexterity={body.dexterity}
                    health={body.health}
                />
                <Image url={body.pic} />
                <Equipment
                    equipment={user.equipmentList}
                />
            </div>
            <div className="SecondRow">
                <ItemList itemList={user.itemList} />
            </div>
        </div>
        : <div>spinner</div>
    )
}

export default CharPage;