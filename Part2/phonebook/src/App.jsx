import { useState } from 'react'


const App=()=>{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("new name")
  const [newNumber, setNewNumber] = useState("new number")
  const [filterValue, setFilterValue] = useState("")
  const [personsFiltered, setPersonsFiltered] = useState()

  const addPerson=(event)=>{
    event.preventDefault()
    let foundPerson = persons.filter(person=>person.name===newName)
    console.log(foundPerson.length)
    if (foundPerson.length) {
      alert(`${newName} is already added to phonebook`)
      
    } else {
      let newPerson ={
        name:newName,
        number:newNumber,
        id:persons.length+1
      }
      setPersons(persons.concat(newPerson))
      alert(`${newName} added to phonebook`)
      setNewName("new name")  
    }
    
    
  }

  const handleFilterChange=(event)=>{
    let value = event.target.value    
    console.log(value)
    setFilterValue(value)
    let names = persons.map(person=>person.name.toLowerCase())
    console.log(names)
    let namesFiltered = []
    for (let index = 0; index < names.length; index++) {
      if(names[index].slice(0,value.length) === value){
        namesFiltered.push(persons[index])
      }      
    }
    console.log(namesFiltered)
    setPersonsFiltered(namesFiltered)
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
      filter shown with <input type='text' value={filterValue} onChange={handleFilterChange} />
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type='submit'>add</button></div>
      </form>
      <h2>Numbers</h2>
      {personsFiltered?
      personsFiltered.map(person=><p key={person.id}>{person.name} {person.number}</p>)
      :persons.map(person=><p key={person.id}>{person.name} {person.number}</p>)}
    </div>

  )
}
export default App
