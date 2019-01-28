const axios = require('axios')
const moment = require('moment')

const getLunch = async () => {
    const year = moment().format('Y')
    const month = moment().format('MM')
    const day = moment().format('DD')
    const response = await axios
        .get(
            `https://www.sodexo.fi/ruokalistat/output/daily_json/31314/${year}/${month}/${day}/fi`
        )
        .then(response => response.data)

    return response
}

module.exports = { getLunch }
