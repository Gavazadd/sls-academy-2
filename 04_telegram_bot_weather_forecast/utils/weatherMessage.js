const {optionsDate, optionsTime} = require('./options')
const axios = require("axios")
const weatherAPIKey = process.env.OPENWEATHER_API_KEY
async function weatherMessage (interval ){
    const forecast = await axios
        .get('https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&APPID='+weatherAPIKey)
    let forecastArray = forecast.data.list
    let  forecastMessage = 'Погода в Києві:\n\n'
    const groupedDate = new Map()
    forecastArray
        .forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleString('uk-UA', optionsDate)
            const time = new Date(forecast.dt * 1000).toLocaleString('uk-UA', optionsTime)
            const temperature = forecast.main.temp - 273.15
            const temperatureFeeling = forecast.main.feels_like - 273.15
            let weatherStatus
            const cloudiness = forecast.clouds.all
            if (cloudiness < 30) {
                weatherStatus = "☀️"
            } else if (cloudiness < 60) {
                weatherStatus = "🌤️"
            } else {
                weatherStatus =  "☁️"
            }
            if (!groupedDate.has(date)) {
                groupedDate.set(date, [])
            }
            groupedDate.get(date).push(`${time}, +${Math.round(temperature)}°C, відчувається як +${Math.round(temperatureFeeling)}°C, ${weatherStatus}`)
        })

    for (const key of groupedDate.keys()) {
        forecastMessage += key + ':\n'

        for (let i = 0; i < groupedDate.get(key).length; i++) {
            if (interval === 6 && i % 2 !== 0) {
                continue
            }
            forecastMessage += '    ' + groupedDate.get(key)[i] + '\n'
        }
        forecastMessage += '\n'
    }
    return forecastMessage
}

module.exports = {weatherMessage}