function ListItem(props){

    return (
        // <>
        // {JSON.stringify(props.creature)}
        // </>
        <li>
            {props.creature.name} is from {props.creature.origin}
        </li>
    )
}

export default ListItem;