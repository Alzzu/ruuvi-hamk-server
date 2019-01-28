const axios = require('axios')

const getLunch = async () => {
    const year = '2019'
    const month = '01'
    const day = '28'
    const response = await axios
        .get(
            `https://www.sodexo.fi/ruokalistat/output/daily_json/31314/${year}/${month}/${day}/fi`
        )
        .then(response => response.data)

    return response
}

module.exports = { getLunch }
