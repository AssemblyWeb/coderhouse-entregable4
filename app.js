const express = require('express')
const app = express()
const errorHandler = require('./src/middlewares/errorHandler.js')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const router = require('./src/routes/index.js')

app.use('/api', router)

app.get('/ping', (_, res) => {
    console.log("wanna a pong?")
    res.send("PONG")
})

app.use(errorHandler)
app.use(morgan('dev'))

module.exports = app


