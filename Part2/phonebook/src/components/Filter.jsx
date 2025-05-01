
const Filter = (props) => {
    console.log(props);
    
    return (
        <div>            
            {props.personsFilter ?
                props.personsFilter.map(person => <p key={person.id}>{person.name} {person.number}<input onClick={()=>props.removePerson(person)} type="button" value="delete" /></p>)
                : props.persons.map(person => <p key={person.id}>{person.name} {person.number}<input onClick={()=>props.removePerson(person)} type="button" value="delete" /></p>)}
        </div>
    )
}

export default Filter