const Part = (props) => {
    console.log(props);
    return (
        <li>{props.part} {props.exercise}</li>
    )
}

export default Part