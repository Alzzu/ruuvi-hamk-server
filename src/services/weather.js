const https = require('https')

require('dotenv').config()

const updateForecast = async () => {}

let daily = updateForecast()
setInterval(() => {
    console.log(daily)
}, 1000)
setInterval(() => {
    daily = updateForecast()
}, 1800000)

const getDailyForecast = () => {
    return daily
}

module.exports = {
    getDailyForecast,
}
