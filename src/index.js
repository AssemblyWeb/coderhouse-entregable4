require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const productosRouter = require('./routes/productos')

app.use('/api/productos', productosRouter)

app.get('/ping', (_, res) => {
    console.log("wanna a pong?")
    res.send("PONG")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`)
})