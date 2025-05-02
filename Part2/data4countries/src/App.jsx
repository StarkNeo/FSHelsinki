import axios from "axios"
import { useState, useEffect } from "react"
import DisplayFeatures from "./components/DisplayFeatures"
import './App.css'
import Search from "./components/Search"

const App = () => {
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])
  const [message, setMessage] = useState("")
  const [weather, setWeather] = useState()

  
  const cleanText = (text)=>{
    let cleanedText = text.replace(/[^a-zA-Z0-9]/g,"");
    return cleanedText;
  }

  const getWeather = (city)=>{
    console.log(city)
    let cityValue=cleanText(city);
    const apiKey=import.meta.env.VITE_API_KEY;
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}`;
    axios.get(url)
    .then(response=>{
      console.log(response.data)
      setWeather(response.data)      
    })
    .catch(error=>{
      setWeather("Weather information not found")
    })
  }

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
            getWeather(countries[0].capital[0])
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

  const handleClickShow = (country) => {
      console.log(country)
      getCountry(country.name.common)
      getWeather(country.capital[0])

      setSearch("")
    }


  return(
    <>
    <Search value={search} search={handleSearchChange} message={message} />
      
    <div>
      {filtered.length ===1?<DisplayFeatures weather={weather} country={filtered[0]} />:filtered.map((c,i)=><li key={i}>{c.name.common} <button onClick={()=>handleClickShow(c)}>Show</button></li>)}
      
    </div>
    </>
    
    
  )
}

export default App
