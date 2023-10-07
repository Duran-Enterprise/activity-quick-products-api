import express, { Request, Response } from 'express'

const app = express()
const port = 3222

function sayHelloWorld(req: Request, res: Response) {
    res.send('Hello World!')
}

function add(req: Request, res: Response) {
    try {
        let result = 0
        const { first, second } = req.query
        console.log('First: ', Number(first))
        console.log('Second: ', Number(second))
        result = Number(first) + Number(second)

        if (Number(first) < 0) {
            console.log('NEGATIVE SYA')
            throw new Error('Negative numbers not allowed')
        }

        if (isNaN(result)) {
            throw new Error('Invalid format, we only accept actual numbers')
        }

        res.status(200)
        res.json(result)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400)
            res.json(error.message)
        }
    }
}

app.get('/', sayHelloWorld)

app.get('/add', sayHelloWorld)
app.post('/add', add)

app.get('/test', (req, res) => {
    res.json({
        status: 200,
        message: 'successful!',
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
