type CardProps = {
    details:{
        name:string;
        pic:string;
        level:number;
        price:number;
    }

}

export const Card = ({details}: CardProps) =>(
    <>
    <img src={details.pic}/>
    <div>Name: { details.name }</div>
    <div>level: { details.level }</div>
    <div>price: { details.price }</div>
    </>
)