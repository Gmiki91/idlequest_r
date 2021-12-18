import { Image } from "./Image"

type CardProps = {
    details: {
        name: string;
        pic: string;
        level: number;
        price: number;
        qty: number;
    },
    closeModal: () => void

}

export const Card = ({ details, closeModal }: CardProps) =>{
    const isEquipped = details.qty ? true : false;
    return (
    <div style={{ display: 'flex', flexDirection: 'column', padding:25,backgroundColor: 'rgba(56, 61, 69,0.7)', borderColor: 'black', borderWidth:2, borderStyle:'solid', borderRadius:16}}>
        <Image pic={details.pic} />
        <div>Name: {details.name}</div>
        <div>level: {details.level}</div>
        <div>price: {details.price}</div>
        {isEquipped ? <div>quantity: {details.qty}</div>:null}
        <button onClick={closeModal}>Cancel</button>
        {isEquipped ? <button>Equip</button> : <button>Unequip</button>}
    </div>
)

}