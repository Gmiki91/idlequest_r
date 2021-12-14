type ImageProps = {
    url: string
}

export const Image = (props: ImageProps) =>
(<>
    <img  
    src={require(`../assets/${props.url}.png`).default} alt='zombie'
    />
</>)

