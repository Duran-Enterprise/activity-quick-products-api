import express from 'express'
import {
    getAll,
    getManyByTitle,
    getManyByPriceRange,
    getManyByBrand,
    getAllInStock,
    getManyByRatingRange,
    getOneById,
} from '../controllers'

export const router = express.Router()

router.get('/products', getAll)
router.get('/products/title', getManyByTitle)
router.get('/products/price', getManyByPriceRange)
router.get('/products/brand', getManyByBrand)
router.get('/products/stock', getAllInStock)
router.get('/products/rating', getManyByRatingRange)
router.get('/products/:productId', getOneById)
