type StatProp={
    strength: number;
    dexterity: number;
    health: number;
}

export const Stats = (props: StatProp) => (<ul>
    <li>Erő: {props.strength}</li>
    <li>Ügyesség: {props.dexterity}</li>
    <li>Élet: {props.health}</li>
</ul>
);