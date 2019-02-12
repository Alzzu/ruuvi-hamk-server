const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
const ruuvi = require('./services/ruuvi')
const port = process.env.EXPRESSPORT || 3000
const app = express()

ruuvi.start()

app.use(cors())
app.use('', router)
app.listen(port)
