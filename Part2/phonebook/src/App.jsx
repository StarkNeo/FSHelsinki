import { useState, useEffect } from 'react'
import PhoneBook from './components/PhoneBook'
import serverReq from './services/serverRequests'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [personsFiltered, setPersonsFiltered] = useState()
  const [message, setMessage]=useState(" ")

  useEffect(() => {
    serverReq.getAll()
      .then(response =>{
        console.log(response)
        setPersons(response)
        
        setMessage("Contacts Loaded")
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      }).catch(error=>setMessage("Loading contacts failed"))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(newName.trim() ==="" || newNumber.trim() ===""){
      alert("Empty fields, review your information")
      return
    }
    let foundPerson = persons.filter(person => person.name === newName)
    console.log(foundPerson)
    console.log(foundPerson.length)
    if (foundPerson.length) {
      if (foundPerson[0].number !==newNumber) {
        let update = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        console.log(update)
        if (update) {
          let newPerson ={
            name:newName,
            number:newNumber
          }
          serverReq.update(foundPerson[0].id,newPerson)
          .then(response=>{
            setPersons(persons.filter(p=>p.id!==foundPerson[0].id).concat(response))
            setMessage("Record Updated")
            
            setNewName("")
            setNewNumber("")
            setFilterValue("")
            setPersonsFiltered("")
          })
        }
      
      } else {
        //alert(`${newName} is already added to phonebook`)
        setMessage(`${newName} is already added to phonebook`)
      }      

    } else {
      let newPerson = {
        name: newName,
        number: newNumber
      }
      serverReq.create(newPerson)
        .then(response => {
          console.log(response)
          //alert(`${newName} added to phonebook`)
          setMessage(`${newName} added to phonebook`)
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
    setTimeout(()=>{
      setMessage(null)
    },5000)


  }

  const handleFilterChange = (event) => {
    let value = event.target.value
    console.log(value.length)
    
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
    value.length>0?setMessage(`Names filterd by: ${value}`):setMessage(" ")
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

  const handleRemove=(person)=>{
    serverReq.getPerson(person.id)
    .then(response=>{
      console.log(response.data)
      if(confirm(`Delete ${person.name}?`)){      
        serverReq.remove(person.id).then(
          setPersons(()=>persons.filter(p=>p.id !== person.id))        
        )
        setMessage(`${person.name} removed`)
      } else{
        console.log(`${person.name} still on the game`)
      }
      
    
    
    })
    .catch(error=>{
      setMessage(`Information of ${person.name} has already been removed from server`)
      setPersons(persons.filter(p=>p.id!==person.id))
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  let phoneBook = {
    name: newName,
    number: newNumber,
    persons: persons,
    personsFiltered: personsFiltered,
    value: filterValue,
    message,
    changeName: handleNameChange,
    changeNumber: handleNumberChange,
    changeFilter: handleFilterChange,
    add: addPerson,
    handleRemove
  }
  return (
    <div>
      <PhoneBook book={phoneBook} />

    </div>

  )
}
export default App
