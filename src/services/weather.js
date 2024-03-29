const axios = require('axios')
require('dotenv').config()

let daily

const updateForecast = async () => {
    const res = await axios
        .get(
            `https://api.darksky.net/forecast/${
                process.env.DARKSKY_APIKEY
            }/60.976229,24.478586?units=si`
        )
        .then(response => {
            return response.data
        })
    return res
}

const refresh = async () => {
    updateForecast().then(data => {
        daily = data.daily
    })

    setInterval(async () => {
        updateForecast().then(data => {
            daily = data.daily
        })
    }, 1800000)
}

refresh()

const returnDaily = () => {
    return daily
}

module.exports = {
    returnDaily,
}
