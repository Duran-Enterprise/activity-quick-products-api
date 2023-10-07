import express, { Request, Response } from 'express'

const app = express()
const port = 3222

function sayHelloWorld(req: Request, res: Response) {
    res.send('Hello World!')
}

app.get('/', sayHelloWorld)
app.get('/test', (req, res) => {
    res.json({
        status: 200,
        message: 'successful!',
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
