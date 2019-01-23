const Influx = require('influx')
require('dotenv').config()

const influx = new Influx.InfluxDB({
    host: process.env.INFLUXIP,
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

module.exports = influx
