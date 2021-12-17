type CardProps = {
    name:string;
    pic:string;
    level:number;
    price:number;
    qty:number;

}

export const Card = (props: CardProps) =>(
    <>
    <img src={props.pic}/>
    <div>Name: { props.name }</div>
    <div>level: { props.level }</div>
    <div>price: { props.price }</div>
    <div>qty: { props.qty }</div>
    </>
)