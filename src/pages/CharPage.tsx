import { Equipment } from "../components/Equipment";
import { Image } from "../components/Image";
import { ItemList } from "../components/ItemList";
import { Stats } from "../components/Stats";
import './CharPage.css';



const CharPage = () => {
    return (
        <div className="Container">
            <div className="FirstRow">
                <Stats />
                <Image url='zombie' />
                <Equipment />
            </div>
            <div className="SecondRow">
                <ItemList />
            </div>
        </div>

    );
}



export default CharPage;