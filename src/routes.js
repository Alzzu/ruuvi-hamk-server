const express = require('express')
const influx = require('./db')

const router = express.Router()

router.get('/tags', (req, res) => {
    influx.query(`select ruuviId from "measurements" group by ruuviId`)
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

router.get('/tag/:id', (req, res) => {
    const id = req.params.id
    console.log(`Getting single record for ${id}`)
    influx
        .query(
            `SELECT * FROM "measurements" WHERE ruuviId = '${id}' and time > now() - 7d order by desc `
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
