const express = require('express')
const ruuvi = require('node-ruuvitag')
const influx = require('./db')
const cors = require('cors')
const router = require('./routes')

const app = express()
const port = 3000
app.use(cors())
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

const saveToDB = async () => {
    if (Object.keys(ruuvitags).length !== 0) {
        console.log('Adding data to DB')
        await Object.keys(ruuvitags).forEach(tag => {
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

        ruuvitags = {}
    } else console.log('Nothing to add to DB')
}

app.use('', router)

app.listen(port)
