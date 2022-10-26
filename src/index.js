require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

const productosRouter = require('./routes/productos')

app.use('/api/productos', productosRouter)

app.get('/ping', (_, res) => {
    console.log("wanna a pong?")
    res.send("PONG")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})