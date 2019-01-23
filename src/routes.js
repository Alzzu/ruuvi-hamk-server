const express = require('express')
const influx = require('./db')

const router = express.Router()

router.get('/latest', (req, res) => {
    influx
        .query(
            'SELECT * FROM "measurements" group by "ruuviId" order by time desc limit 1'
        )
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

module.exports = router
