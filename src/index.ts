require('dotenv').config()
import express from 'express'
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

import productosRouter from './routes/productos'

app.use('/api/productos', productosRouter)

app.get('/*', (_, res) => {
    console.log("wanna a pong?")
    res.send(`<h1>404 PONG</h1><br><a href="http://localhost:${PORT}/api/productos">http://localhost:${PORT}/api/productos</a>`)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})