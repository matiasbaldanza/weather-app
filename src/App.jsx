import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import WeatherMap from './components/WeatherMap'
import Footer from './components/Footer'

function App() {
  const [forecastData, setForecastData] = useState(null)
  const { location, current, forecast, alerts } = forecastData ?? {} 
  const lastUpdated = location ? new Date(location?.localtime) : null

  const forecastNextSixDays = forecast?.forecastday.map((data) => {
    return {
      date: data.date,
      weekday: new Date(data.date).toLocaleDateString('en-us', { weekday: "short" }), 
      maxtemp_c: Math.round(data.day.maxtemp_c), 
      mintemp_c: Math.round(data.day.mintemp_c), 
      condition_icon: data.day.condition.icon,
      condition_text: data.day.condition.text
      }
    }).slice(1,)

  const hourlyForecast = forecast?.forecastday[0].hour.map((data) => {
    return {
      time: new Date(data.time).toLocaleTimeString('en-us', { hour: '2-digit' }),
      condition_icon: data.condition.icon,
      condition_text: data.condition.text,
      temp_c: Math.round(data.temp_c),
      humidity: Math.round(data.humidity),
      wind_kph: data.wind_kph, 
      }
    })

  useEffect(() => {
    api.forecast_local()
      .then((response) => response.json())
      .then((data) => setForecastData(data)) 
  }, [])

  return (
      <div className="container">
{/* TOP MENU */}
        <nav className='container flex justify-end gap-2'>
            <span>⚙️</span>
            <span>🔃</span>
        </nav>
        { !forecastData 
            ? <p>Loading...</p> 
            : <main className='container flex flex-col gap-5 mx-auto'>
                <Header location={location}/>
                <CurrentWeather 
                  current={current}
                  alerts={alerts}  
                  forecastNextSixDays={forecastNextSixDays}
                />
                <HourlyForecast 
                  lastUpdated={lastUpdated} 
                  hourlyForecast={hourlyForecast}
                />
                <WeatherMap />
                <Footer />
              </main>
        }
      </div>
  )
}

export default App
