import express from 'express'
import { logs } from './middleware'

// routes
import { router as benokRouter } from './routes/benok'

const app = express()

app.use('/', logs)

app.get('/', (_req, res) => {
    res.json({
        greetings: 'Quick Products API',
    })
})

app.use('/benok', benokRouter)

const PORT = 3222

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
