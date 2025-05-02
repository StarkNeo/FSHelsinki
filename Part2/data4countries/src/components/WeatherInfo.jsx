const WeatherInfo = ({weather,capital}) => {

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature {weather.current.temp_c} Celsius</p>
            <img src={weather.current.condition.icon} alt="condition image" />
            <p>{weather.current.condition.text} {weather.current.wind_mph} mph</p>

        </div>
    )
}

export default WeatherInfo