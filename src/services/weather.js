const axios = require('axios')
require('dotenv').config()

let daily

const updateForecast = async () => {
    const res = await axios
        .get(
            `https://api.darksky.net/forecast/${
                process.env.DARKSKY_APIKEY
            }/60.976229,24.478586`
        )
        .then(response => {
            return response.data
        })
    return res
}

const refresh = async () => {
    let forecast = await updateForecast()

    setInterval(async () => {
        forecast = await updateForecast()
    }, 3000)

    daily = forecast.daily
}

refresh()

module.exports = {
    daily,
}
