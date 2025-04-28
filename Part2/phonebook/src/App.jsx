import { useState } from 'react'


const App=()=>{
  const [persons, setPersons] = useState([{name:'Arto Hellas'}])
  const [newName, setNewName] = useState("new name")

  const addPerson=(event)=>{
    event.preventDefault()
    let newPerson ={
      name:newName
    }
    setPersons(persons.concat(newPerson))
    setNewName("new name")
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><p key={person.name}>{person.name}</p>)}
    </div>

  )
}
export default App
