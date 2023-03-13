const key = import.meta.env.VITE_WEATHER_API_KEY

export const api = {
    current: (query) => fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=Necochea&aqi=yes`),
    current_local: () => fetch(`http://localhost:5173/data.json`),
}
