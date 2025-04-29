import { useState } from "react"

const Filter = (props) => {
    console.log(props);
    
    return (
        <div>            
            {props.personsFilter ?
                props.personsFilter.map(person => <p key={person.id}>{person.name} {person.number}</p>)
                : props.persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Filter