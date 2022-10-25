require('dotenv').config()
import express from 'express'
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

import productosRouter from './routes/productos'

// app.use('/',(_, res) => {
//     res.status(200).json({
//         health: "up",
//         success: true
//     })
// })

app.use('/api/productos', productosRouter)

app.get('/ping', (_, res) => {
    console.log("wanna a pong?")
    res.send("PONG")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})