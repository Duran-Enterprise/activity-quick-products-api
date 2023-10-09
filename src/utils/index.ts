import { Response } from 'express'
import fs from 'fs/promises'
import { ProductIdProps, ProductsProps, ReqQueryProps } from '../types'
import { paginationModel, titleModel, priceModel, ratingModel } from '../models'

/**DOCU:
 * ************************************************************
 * - handles error
 */
export const handleError = (res: Response, error: Error) => {
    if (error instanceof Error) {
        res.status(400).json({
            errors: JSON.parse(error.message),
        })
    } else {
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

/**DOCU:
 * ************************************************************
 * - custom function for throwing new errors
 * @param errors - array of errors
 * @throws a new Error
 */
export const throwNewError = (errors: string[]) => {
    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors))
    }
}

/**DOCU:
 * ************************************************************
 * - dynamically calculates the max price value
 */
export const maxPriceValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.max(acc, cur.price)
    }, 0)
}

/**DOCU:
 * ************************************************************
 * - dynamically calculates the minRatingValue
 */
export const minRatingValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.min(acc, cur.rating)
    }, 0)
}

/**DOCU:
 * ************************************************************
 * - dynamically calculates the maxRatingValue
 */
export const maxRatingValue = async () => {
    const products = await readProductsFile()

    return products.reduce((acc, cur) => {
        return Math.max(acc, cur.rating)
    }, 0)
}

/**DOCU:
 * ************************************************************
 * - reads the file
 *
 * @returns JSON parsed data
 */
export const readProductsFile = async (): Promise<ProductsProps[]> => {
    const data = await fs.readFile('products.json', 'utf-8')
    return JSON.parse(data)
}

/**DOCU:
 * ************************************************************
 * - converts the limit and skip from string to number
 * @param reqQuery (req.query)
 * @returns req.query.limit and req.query.skip as Numbers
 */
export const parseQuery = async (reqQuery: ReqQueryProps) => ({
    ...paginationModel(reqQuery),
    ...titleModel(reqQuery),
    ...(await priceModel(reqQuery)),
    ...(await ratingModel(reqQuery)),
})

/**DOCU:
 * ************************************************************
 * - converts productId from string to number
 */
export const parseParams = (reqParams: ProductIdProps) => {
    const productId = Number(reqParams.productId)
    return { productId }
}
