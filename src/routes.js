const express = require('express')
const influx = require('./services/db')
const weather = require('./services/weather')
const lunch = require('./services/lunch')

const router = express.Router()

router.get('/tags', (req, res) => {
    influx
        .query(
            `select ruuviId, temperature from "measurements" group by ruuviId limit 1`
        )
        .then(result => {
            let ruuviIds = []
            result.forEach(value => {
                ruuviIds.push(value.ruuviId)
            })

            res.status(200).json(ruuviIds)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

router.get('/tags/latest', (req, res) => {
    influx
        .query(
            'SELECT * FROM "measurements" where time > now() - 2m group by "ruuviId" order by time desc limit 1'
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

router.get('/tag/:id', (req, res) => {
    const id = req.params.id
    console.log(`Getting single record for ${id}`)
    influx
        .query(
            `SELECT mean(temperature) as "temperature" FROM "measurements" WHERE ruuviId = '${id}' and time > now() - 12h group by time(15m) order by desc limit ${limit}`
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

router.get('/tag/:id/mean', (req, res) => {
    const { id } = req.params
    influx
        .query(
            `select mean(temperature) as "temperature" from "measurements" where ruuviId = '${id}' and time > now() - 24h`
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

router.get('/weather', (req, res) => {
    res.status(200).json(weather.returnDaily())
})

router.get('/lunch/:year/:month/:day', (req, res) => {
    const { year, month, day } = req.params
    lunch.getLunch(year, month, day).then(data => {
        res.status(200).json(data)
    })
})

module.exports = router
