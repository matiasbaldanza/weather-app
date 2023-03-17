import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'

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
{/* HEADER */}
                <header className='flex flex-col justify-end h-40 px-4'>
                  <h1 
                    className='text-4xl font-bold truncate'
                  >{location.name}
                  </h1>
                  <p className='block text-2xl italic font-normal truncate'
                  >{location.region}, {location.country}</p>
                </header>

{/* CURRENT WEATHER CARD */}
                <section className='flex flex-col gap-4 p-4 bg-slate-200 rounded-xl'>
    {/* 1. Temperatures */}
                  <div className='flex justify-start space-x-2 divide-x divide-black'>
                    <p className='text-5xl font-bold'>
                      {current.temp_c}°</p>
                    <div className='flex flex-col items-start justify-between pl-2'>
                      <p className='' >38°</p>
                      <p className='text-gray-500'>27°</p>
                    </div>
                  </div>

    {/* 2. Weather conditions */}
                  <div>
                    <p className='flex items-center'>{current.condition.text} 
                      <img 
                          className='h-6'
                          src={current.condition.icon} alt={current.condition.text} 
                      />
                    </p>
                    <p>Feels Like: {current.feelslike_c}°</p>
                    <p>Air Quality: {current.air_quality["us-epa-index"]} — Good</p>
                    <p>
                      { alerts.alert.length > 0 && alerts.alert[0].event + " 🔺"
                      }
                    </p> 
                  </div>  
    
    {/* Divider */}
                  <div className='h-px my-2 bg-gray-400'></div>
    
    {/* 2. Weather next 6 days */}
                  <div  className='flex justify-around gap-2'>
                     { 
                        forecastNextSixDays.map((day) => {
                          return <div 
                                    key={day.date}
                                    className='flex flex-col gap-1 text-center'
                                  >
                                    <div>{day.weekday.toUpperCase()}</div>
                                    <div>
                                      <img 
                                        className='h-6'
                                        src={day.condition_icon} 
                                        alt={day.condition_text} 
                                        title={day.condition_text} 
                                      />
                                    </div>
                                    <div className=''>{day.maxtemp_c}°</div>
                                    <div className='text-gray-500'>{day.mintemp_c}°</div>
                                </div>
                        })
                      }
                  </div>
      {/* 3. Additional conditions icons current weather */}
                  <div className='flex justify-between gap-4'>
                    {[
                      `H ${current.humidity}%`, 
                      `P ${current.precip_mm} mm`,
                      `UV ${current.uv}`
                      ].map((data, index) => <div 
                                      key={index}
                                      className='p-4 text-center bg-white rounded-full flex-grow basis-[30%]'>
                                      {data}
                                    </div>)}
                  </div>
                </section>

{/* Hourly forest for today */}
                <section className='flex flex-col gap-4 p-4 bg-slate-200 rounded-xl'>
      {/* 1. Heading */}
                  <div>
                    <h2
                      className='text-lg font-light uppercase'
                      >{lastUpdated?.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })}
                    </h2>
                    <p className='text-sm font-light'> {/* TODO: calculate last updated message */}
                      Last updated: 
                    </p>
                  </div>

      {/* 2. Scrollable with hourly forecast */}
                  <div className='flex flex-col gap-3 text-gray-600 max-h-44 overflow-y-scroll '> {/* TODO: make scrollbar visible (not overlay) and move it to the container edge */}
                      {
                        hourlyForecast.map((hourData) => (
                          <div 
                            key={hourData.time}
                            className='grid grid-cols-6 gap-1'
                          >
                            <div
                              className='justify-self-left'
                            >{hourData.time}</div>
                            <img 
                              className='justify-self-center h-6 text-right'
                              src={hourData.condition_icon} 
                              alt={hourData.condition_text} 
                              title={hourData.condition_text} 
                            />
                            <div
                              className='text-center'
                            >{hourData.temp_c}°</div>
                            <div
                              className='text-right'
                            >{hourData.humidity}%</div>
                            <div
                              className='col-span-2  text-right'
                            >{hourData.wind_kph} km/h</div>
                          </div>
                        ))
                      }

                  </div>
      {/* 3. Button to access more information */}
                  <button className='rounded-full bg-sky-600 py-3 px-4 text-white w-fit self-center'>More weather details</button>
                </section>
              </main>
        }
      </div>
  )
}

export default App
