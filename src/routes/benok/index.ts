import express from 'express'
import { router as productsRouter } from './products'

export const router = express.Router()

router.get('/', (_req, res) => {
    res.json({
        greetings: "You are viewing Benok's API",
    })
})

router.use('/products', productsRouter)
