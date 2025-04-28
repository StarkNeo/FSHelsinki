import { useState } from 'react'


const App=()=>{
  const [persons, setPersons] = useState([{name:'Arto Hellas'}])
  const [newName, setNewName] = useState("new name")

  const validateName=()=>{
    
  }
  const addPerson=(event)=>{
    event.preventDefault()
    let foundPerson = persons.filter(person=>person.name===newName)
    console.log(foundPerson.length)
    if (foundPerson.length) {
      alert(`${newName} is already added to phonebook`)
      
    } else {
      let newPerson ={
        name:newName
      }
      setPersons(persons.concat(newPerson))
      alert(`${newName} added to phonebook`)
      setNewName("new name")  
    }
    
    
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
      {persons.map(person=><p key={persons.name}>{person.name}</p>)}
    </div>

  )
}
export default App
