import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('Testi')
})

app.listen(3000)
