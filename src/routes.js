const express = require('express')
const influx = require('./db')

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
            'SELECT * FROM "measurements" group by "ruuviId" order by time desc limit 1'
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

router.get('/tag/:id/:limit*?', (req, res) => {
    const id = req.params.id
    let limit = 50
    if (req.params.limit) limit = req.params.limit
    console.log(`Getting single record for ${id}`)
    influx
        .query(
            `SELECT temperature FROM "measurements" WHERE ruuviId = '${id}' order by asc limit ${limit}`
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).send(err.stack)
        })
})

function groupBy(key, array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
        var added = false
        for (var j = 0; j < result.length; j++) {
            if (result[j][key] == array[i][key]) {
                result[j].items.push(array[i])
                added = true
                break
            }
        }
        if (!added) {
            var entry = { items: [] }
            entry[key] = array[i][key]
            entry.items.push(array[i])
            result.push(entry)
        }
    }
    return result[0]
}

module.exports = router
