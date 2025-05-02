import axios from "axios"
import { useState, useEffect } from "react"
import DisplayFeatures from "./components/DisplayFeatures"
import './App.css'


const App = () => {
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])
  const [message, setMessage] = useState("")

 
  const getAll = (substring) => {
      setMessage(<p className="loading">Loading...</p> )
      let url = "https://studies.cs.helsinki.fi/restcountries/api/all";
      axios.get(url)
        .then(response => {
          let countries = response.data.filter(c => c.name.common.toLowerCase().includes(substring.toLowerCase()))
          console.log(countries)
          console.log(countries.length)

          if (countries.length === 0) {
            setMessage("No countries found")
            setFiltered([])
          }
          else if (countries.length === 1) {
            console.log(countries[0])
            getCountry(countries[0].name.common)
          }
          else if (countries.length > 1 && countries.length <= 10) {
            setFiltered(countries);
            setMessage("")
          }
          else {
            setMessage("Too many matches, specify another filter")
            setFiltered([])
          }


        })
    }

  const getCountry = (countryName) => {
      let url = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
      axios.get(url)
        .then(response => {
          console.log(response.data)
          setFiltered([response.data])
          setMessage("")

        })
    }


  const handleSearchChange = (event) => {
      console.log(event.target.value)
      if (event.target.value === "") {
        setMessage("")
        setSearch("")
      } else {
        setSearch(event.target.value)
        getAll(event.target.value)
      }
    }

  const handleClickShow = (countryName) => {
      console.log(countryName)
      getCountry(countryName)
      setSearch("")
    }


  return(
    <>
    <div>
      <label htmlFor="search">find countries</label>
      <input type="search" name="search" id="search" value={search} onChange={handleSearchChange} />
      <br/> {message} <br/>     
      
    </div>
    <div>
      {filtered.length ===1?<DisplayFeatures country={filtered[0]} />:filtered.map((c,i)=><li key={i}>{c.name.common} <button onClick={()=>handleClickShow(c.name.common)}>Show</button></li>)}
      
    </div>
    </>
    
    
  )
}

export default App
