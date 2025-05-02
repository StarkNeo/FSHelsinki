const CountryInfo=({country})=>{
    let flagStyle={
        width:250,
        height:200
    }
    let languages = []
    for (const key in country.languages) {
        languages.push(country.languages[key])
    }

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
               {languages.map(lang=><li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.svg} alt="flag" style={flagStyle} />
        </div>
    )
}

export default CountryInfo