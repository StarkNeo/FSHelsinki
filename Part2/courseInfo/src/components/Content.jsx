import Part from "./Part";

const Content = (props) => {
    console.log(props);
    let parts = props.parts;
    console.log(parts);
    return (
        <ul>
            {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises} />)}
        </ul>


    )
}

export default Content
