const express = require('express')
const ruuvi = require('node-ruuvitag')
const Influx = require('influx')

const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'ruuvi',
    schema: [
        {
            measurement: 'measurements',
            fields: {
                rssi: Influx.FieldType.INTEGER,
                humidity: Influx.FieldType.FLOAT,
                temperature: Influx.FieldType.FLOAT,
                pressure: Influx.FieldType.INTEGER,
                accelerationX: Influx.FieldType.INTEGER,
                accelerationY: Influx.FieldType.INTEGER,
                accelerationZ: Influx.FieldType.INTEGER,
                battery: Influx.FieldType.INTEGER,
            },
            tags: ['ruuviId'],
        },
    ],
})

const app = express()

let ruuvitags = {}

ruuvi.on('found', tag => {
    console.log(`Found RuuviTag, id: ${tag.id}`)

    ruuvitags[tag.id] = {}

    tag.on('updated', data => {
        let ruuvidata = {}
        ruuvidata.rssi = data.rssi
        ruuvidata.humidity = data.humidity
        ruuvidata.temperature = data.temperature
        ruuvidata.pressure = data.pressure
        ruuvidata.accelerationX = data.accelerationX
        ruuvidata.accelerationY = data.accelerationY
        ruuvidata.accelerationZ = data.accelerationZ
        ruuvidata.battery = data.battery

        ruuvitags[tag.id] = ruuvidata
    })
})

setInterval(() => {
    saveToDB()
}, 10000)

const saveToDB = () => {
    console.log('Adding data to DB')
    Object.keys(ruuvitags).forEach(tag => {
        console.log(tag)

        influx
            .writePoints([
                {
                    measurement: 'measurements',
                    tags: { ruuviId: tag },
                    fields: {
                        rssi: ruuvitags[tag].rssi,
                        humidity: ruuvitags[tag].humidity,
                        temperature: ruuvitags[tag].temperature,
                        pressure: ruuvitags[tag].pressure,
                        accelerationX: ruuvitags[tag].accelerationX,
                        accelerationY: ruuvitags[tag].accelerationY,
                        accelerationZ: ruuvitags[tag].accelerationZ,
                    },
                },
            ])
            .catch(err => {
                console.error(err)
            })
    })
}

const getLatestData = () => {}

app.get('/latest', (req, res) => {
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

app.listen(3000)
