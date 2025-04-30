import { useState, useEffect } from 'react'
import axios from 'axios'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [personsFiltered, setPersonsFiltered] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let foundPerson = persons.filter(person => person.name === newName)
    console.log(foundPerson.length)
    if (foundPerson.length) {
      alert(`${newName} is already added to phonebook`)

    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
        //id:persons.length+1
      }
      axios.post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(response.data)
          alert(`${newName} added to phonebook`)
          setPersons(persons.concat(response.data))          
          setNewName("")
          setNewNumber("")
          setFilterValue("")
          setPersonsFiltered("")
        })
        .catch(error=>{
          console.log(error)
        })

    }


  }

  const handleFilterChange = (event) => {
    let value = event.target.value
    console.log(value)
    setFilterValue(value)
    let names = persons.map(person => person.name.toLowerCase())
    console.log(names)
    let namesFiltered = []
    for (let index = 0; index < names.length; index++) {
      if (names[index].slice(0, value.length) === value) {
        namesFiltered.push(persons[index])
      }
    }
    console.log(namesFiltered)
    setPersonsFiltered(namesFiltered)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  let phoneBook = {
    name: newName,
    number: newNumber,
    persons: persons,
    personsFiltered: personsFiltered,
    value: filterValue,
    changeName: handleNameChange,
    changeNumber: handleNumberChange,
    changeFilter: handleFilterChange,
    add: addPerson,
  }
  return (
    <div>
      <PhoneBook book={phoneBook} />

    </div>

  )
}
export default App
