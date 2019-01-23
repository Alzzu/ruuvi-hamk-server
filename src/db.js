const Influx = require('influx')

const influx = new Influx.InfluxDB({
    host: '10.0.0.7',
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
