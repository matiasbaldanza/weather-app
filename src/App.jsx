import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'

function App() {
  const [forecastData, setForecastData] = useState(null)
  const { location, current, forecast, alerts } = forecastData ?? {} 
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
                  {/* Temperatures */}
                  <div className='flex justify-start space-x-2 divide-x divide-black'>
                    <p className='text-5xl font-bold'>
                      {current.temp_c}°</p>
                    <div className='flex flex-col items-start justify-between pl-2'>
                      <p className='' >38°</p>
                      <p className='text-gray-500'>27°</p>
                    </div>
                  </div>

{/* Weather conditions */}
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
{/* Weather next 6 days */}
                  <div className='h-px my-2 bg-gray-400'></div>
                  <div  className='flex justify-around gap-2'>
                     { 
                        forecastNextSixDays.map((day) => {
                          return  <div 
                                    key={day.date}
                                    className='flex flex-col gap-1 text-center'>
                                    <div>{day.weekday.toUpperCase()}</div>
                                    <div className='flex justify-center'>
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
{/* Additional conditions icons current weather */}
                  <div className='flex justify-between gap-4'>
                    {[
                      `H ${current.humidity}%`, 
                      `P ${current.precip_mm} mm`,
                      `UV ${current.uv}`
                    ].map((data) => <div className='p-4 text-center bg-white rounded-full flex-grow basis-[30%]'>
                        {data}
                      </div>)}
                  </div>

                </section>
              </main>
        }
      </div>
  )
}

export default App
