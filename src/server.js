const express = require('express')
const cors = require('cors')
const router = require('./routes')
const ruuvi = require('./services/ruuvi')
const port = 3001
const app = express()

ruuvi.start()

app.use(cors())
app.use('', router)
app.listen(port)
