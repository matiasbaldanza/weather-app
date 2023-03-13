import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const { location, current } = currentWeather ?? {} 

  useEffect(() => {
    api.current_local()
      .then((response) => response.json())
      .then((data) => setCurrentWeather(data))  
  }, [])

  return (
      <div className="container">
        { !currentWeather 
            ? <p>Loading...</p> 
            : <>
                <header>
                  <h1>{location.name}, {location.region}, {location.country}</h1>
                </header>
                <section>
                  <p>Temp: <span>{current.temp_c}</span></p>
                  <p>Feels Like: <span>{current.feelslike_c}</span></p>
                </section>
              </>
        }
      </div>
  )
}

export default App
