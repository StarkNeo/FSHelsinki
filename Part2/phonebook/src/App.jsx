import { useState } from 'react'


const App=()=>{
  const [persons, setPersons] = useState([{name:'Arto Hellas', number:'040-1234567'}])
  const [newName, setNewName] = useState("new name")
  const [newNumber, setNewNumber] = useState("new number")

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
        name:newName,
        number:newNumber
      }
      setPersons(persons.concat(newPerson))
      alert(`${newName} added to phonebook`)
      setNewName("new name")  
    }
    
    
  }

  const handleNumberChange=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
    </div>

  )
}
export default App
