import express from 'express';
import {
    getAll,
    getManyByTitle,
    getManyByPriceRange,
    getManyByBrand,
    getAllInStock,
    getManyByRatingRange,
    getOneById,
} from '../../../controllers/benok';

export const router = express.Router();

router.get('/', getAll);
router.get('/title', getManyByTitle);
router.get('/price', getManyByPriceRange);
router.get('/brand', getManyByBrand);
router.get('/stock', getAllInStock);
router.get('/rating', getManyByRatingRange);
router.get('/:productId', getOneById);
