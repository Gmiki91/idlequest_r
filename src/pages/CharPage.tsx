import { useContext, useEffect, useState } from 'react';
import { MongoDbContext } from '../App';
import { Equipment } from "../components/Equipment";
import { Image } from "../components/Image";
import { ItemList } from "../components/ItemList";
import { Stats } from "../components/Stats";
import { User } from '../models/User';
import { Body } from '../models/Body'
import './CharPage.css';

const CharPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [body, setBody] = useState<Body | null>(null);
    const mongodb = useContext(MongoDbContext);



    useEffect(() => {
        if (mongodb) {
            const userCollection = mongodb.db("idlequest").collection("users");
            const bodyCollection = mongodb.db("idlequest").collection("bodies");
            const getUser = async () => await userCollection.findOne({ name: 'Miking' });
            const getBody = async (id: string) => await bodyCollection.findOne({ _id: id });

            getUser().then((user: User) => {
                setUser(user);
                getBody(user.bodyId)
                    .then(body =>setBody(body))
                    .catch(err => console.log(err.message))
            })
        }
    }, [mongodb]);


    return (
        <div className="Container">
            {body?
            <div className="FirstRow">
                <Stats 
                dexterity={body.dexterity}
                strength={body.strength}
                health={body.health}
                />
                <Image url={body.pic} />
                <Equipment 
                headEquipment={body.headEquipment}
                leftArmEquipment={body.leftArmEquipment}
                rightArmEquipment={body.rightArmEquipment}
                bodyEquipment={body.bodyEquipment}
                leftWeapon={body.leftWeapon}
                rightWeapon={body.rightWeapon}/>
            </div>
            :null}
            {user?
            <div className="SecondRow">
                <ItemList itemList={user.itemIdList}/>
            </div>
            :null}
        </div>
    );
}



export default CharPage;