const axios = require('axios')

const getLunch = async (year, month, day) => {
    const response = await axios
        .get(
            `https://www.sodexo.fi/ruokalistat/output/daily_json/31314/${year}/${month}/${day}/fi`
        )
        .then(response => response.data)

    return response
}

module.exports = { getLunch }
