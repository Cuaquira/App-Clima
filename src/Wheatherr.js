import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Wheatherr = () => {

    const [Weather, setWeather] = useState({});
    const [isConvert, setIsConvert] = useState (true);

      useEffect(() => {
        function success(pos) {
          var crd = pos.coords;
        
          console.log('Your current position is:');
          console.log('Latitude : ' + crd.latitude);
          console.log('Longitude: ' + crd.longitude);
          console.log('More or less ' + crd.accuracy + 'meters.');
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=5c724cf336bb1c79f54e0ea042c3f137`)
            .then(res => setWeather(res.data))
        };
        
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error);

      }, [])

      const convertToCelsius = (kelvin) => kelvin - 273.15;
      const convertToFahrenheit = () => (Weather.main?.temp - 273.15) * (9/5) + 32;

      console.log(Weather)
    return (
        <div className="card">
          <div className='title'>
         <h1>Weather App--</h1>
         <p className='titlecountry'>{Weather.name},  {Weather.sys?.country}</p>
         </div>

        <div className='Info_one'>
         <div className='informationgrafic'>
         <img className='windows' src={`http://openweathermap.org/img/wn/${Weather.weather?.[0].icon}@2x.png`} alt=""/>
         <p>{isConvert ? `${(convertToCelsius(Weather.main?.temp)).toFixed(2)} Celsius` : `${(convertToFahrenheit()).toFixed(2)} Fahrenheit`}</p>
         </div>

        <div className='Information'>
        <p>"{Weather.weather?.[0].description}"</p>
        <p>Wind speed: {Weather.wind?.speed} m/s</p>
        <p>Humidity: {Weather.main?.humidity}%</p>
        <p>Pressure: {Weather.main?.pressure}mb</p>
        </div>

        </div>

        <div className='Temperaturemaxmin'>
          <span>Min: {`${convertToCelsius(Weather.main?.temp_min).toFixed(2)}`}°C</span>
          <span>Max: {`${convertToCelsius(Weather.main?.temp_max).toFixed(2)}`}°C</span>
        </div>

        <div className='convertFC'>
        <button onClick={()=>setIsConvert(!isConvert)}>Convert Degrees to °F/°C</button>
        </div>

      </div> 

      
    );
}

export default Wheatherr;