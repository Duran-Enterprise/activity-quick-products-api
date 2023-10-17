import { Response } from 'express'
import fs from 'fs/promises'
import { ProductIdProps, ProductsProps, ReqQueryProps } from '../../types'
import {
    paginationModel,
    titleModel,
    priceModel,
    ratingModel,
} from '../../models/benok'

export const handleErrorResponse = (res: Response, error: Error) => {
    let errorMessage: string | string[]

    if (error instanceof Error) {
        errorMessage = error.message

        try {
            const parsedMessage = JSON.parse(errorMessage)
            if (Array.isArray(parsedMessage)) {
                errorMessage = parsedMessage
            }
        } catch (e) {}

        res.status(400).json({
            errors: errorMessage,
        })
    } else {
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

export const throwNewError = (errors: string[]) => {
    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors))
    }
}

export const maxPriceValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.max(acc, cur.price)
    }, 0)
}

export const minRatingValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.min(acc, cur.rating)
    }, 0)
}

export const maxRatingValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.max(acc, cur.rating)
    }, 0)
}

export const readProductsFile = async (): Promise<ProductsProps[]> => {
    const data = await fs.readFile('products.json', 'utf-8')
    return JSON.parse(data)
}

export const parseQuery = async (reqQuery: ReqQueryProps) => ({
    ...paginationModel(reqQuery),
    ...titleModel(reqQuery),
    ...(await priceModel(reqQuery)),
    ...(await ratingModel(reqQuery)),
})

export const parseParams = (reqParams: ProductIdProps) => {
    const productId = Number(reqParams.productId)
    return { productId }
}
