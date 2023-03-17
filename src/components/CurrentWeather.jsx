import React from 'react'

function CurrentWeather({ current, alerts, forecastNextSixDays }) {
  return (
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
  )
}

export default CurrentWeather