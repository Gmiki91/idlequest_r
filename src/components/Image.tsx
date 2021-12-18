type ImageProps = {
    pic: string
}

export const Image = (props: ImageProps) => (<>
   {props.pic? <img src={require(`../assets/${props.pic}.png`).default} alt={props.pic} /> : <div>no image</div>}
</>);
