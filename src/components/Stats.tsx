type StatProps={
    strength:number;
    dexterity:number;
    health:number;
}

export const Stats = ({strength,dexterity,health}: StatProps) => (<ul>
    <li>Erő: {strength}</li>
    <li>Ügyesség: {dexterity}</li>
    <li>Élet: {health}</li>
    </ul>
);