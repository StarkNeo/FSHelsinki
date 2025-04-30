import { useState, useEffect } from 'react'
import PhoneBook from './components/PhoneBook'
import serverReq from './services/serverRequests'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [personsFiltered, setPersonsFiltered] = useState()

  useEffect(() => {
    serverReq.getAll()
      .then(response => setPersons(response))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(newName.trim() ==="" || newNumber.trim() ===""){
      alert("Empty fields, review your information")
      return
    }
    let foundPerson = persons.filter(person => person.name === newName)
    console.log(foundPerson.length)
    if (foundPerson.length) {
      alert(`${newName} is already added to phonebook`)

    } else {
      let newPerson = {
        name: newName,
        number: newNumber
      }
      serverReq.create(newPerson)
        .then(response => {
          console.log(response)
          alert(`${newName} added to phonebook`)
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          setFilterValue("")
          setPersonsFiltered("")
        })
        .catch(error => {
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
