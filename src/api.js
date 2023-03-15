const key = import.meta.env.VITE_WEATHER_API_KEY

export const api = {
    current: (query) => fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=Necochea&aqi=yes&alerts=yes`),
    current_local: () => fetch(`http://localhost:5173/current.json`),

    forecast: (query) => fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=Necochea&days=7&aqi=yes&alerts=yes`),
    forecast_local: () => fetch(`http://localhost:5173/forecast.json`),
}
