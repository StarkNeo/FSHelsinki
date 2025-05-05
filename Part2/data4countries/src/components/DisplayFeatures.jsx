import CountryInfo from "./CountryInfo";
import WeatherInfo from "./WeatherInfo";

const DisplayFeatures=({country,weather})=>{
    let flagStyle={
        width:250,
        height:200
    }
    console.log(country)
    console.log(weather)
    let languages = []
    for (const key in country.languages) {
        languages.push(country.languages[key])
    }
    

    return(
        <>
        <CountryInfo country={country} />
        {weather?<WeatherInfo weather={weather} capital={country.capital[0]} />:""}
        
        </>

    )
}

export default DisplayFeatures