import express from 'express'
import { logs } from './middleware'
import { router } from './routes'

const app = express()
const PORT = 3222

app.get('/', logs)

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
