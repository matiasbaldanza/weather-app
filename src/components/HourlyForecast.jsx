import React from 'react'
import './HourlyForecast.css'

function HourlyForecast({ lastUpdated, hourlyForecast }) {
  return (
    <section className='flex flex-col gap-4 py-4 bg-slate-200 rounded-xl'>
    {/* 1. Heading */}
                <div className='px-4'>
                  <h2
                    className='text-lg font-light uppercase'
                    >{lastUpdated?.toLocaleDateString('en-us', { weekday: "long", month: "long", day: "numeric" })}
                  </h2>
                  <p className='text-sm font-light'> {/* TODO: calculate last updated message */}
                    Last updated: 
                  </p>
                </div>

    {/* 2. Scrollable with hourly forecast */}
                <div className='flex flex-col gap-3 text-gray-600 max-h-44 overflow-y-scroll scrollbar px-4'> 
                    {
                      hourlyForecast.map((hourData) => (
                        <div 
                          key={hourData.time}
                          className='grid grid-cols-6 gap-1 text-[0.95rem]'
                        >
                          <div
                            className='justify-self-left'
                          >{hourData.time}</div>
                          <img 
                            className='justify-self-center h-6 w-6 text-right'
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
                <button className='rounded-full bg-sky-600 py-3 px-4 text-white w-fit self-center'>
                  More weather details
                </button>
              </section>
  )
}

export default HourlyForecast