import { PaginationProps, TitleProps, PriceProps, RatingProps } from '../types'
import { maxPriceValue, maxRatingValue, minRatingValue } from '../utils'

/**DOCU:
 * **********************************************************************
 * - creates a pagination model
 *
 * @param reqQuery - the request query of type PaginationProps
 *
 * @returns the values of limit and skip
 */
export const paginationModel = (reqQuery: PaginationProps) => {
    const limit = reqQuery.limit !== undefined ? Number(reqQuery.limit) : 5
    const skip = reqQuery.skip !== undefined ? Number(reqQuery.skip) : 0

    if (isNaN(Number(limit)) || isNaN(Number(skip))) {
        throw new Error('Only numbers are allowed for limit and skip values')
    }

    if (limit < 0 || skip < 0) {
        throw new Error('Cannot have negative values for limit and skip')
    }

    return { limit, skip }
}

/**DOCU:
 * **********************************************************************
 * - generates a title model
 * @param reqQuery - the request query of type TitleProps
 * @returns the value of name
 */
export const titleModel = (reqQuery: TitleProps) => {
    const name = reqQuery.name || ''
    return { name }
}

/**DOCU:
 * **********************************************************************
 * - generates a price model
 * @param reqQuery - the request query of type PriceProps
 * @returns the value of minPrice and maxPrice
 */
export const priceModel = async (reqQuery: PriceProps) => {
    const minPrice = reqQuery.minPrice !== undefined ? reqQuery.minPrice : 0

    const maxPrice =
        reqQuery.maxPrice !== undefined
            ? reqQuery.maxPrice
            : await maxPriceValue()

    if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
        throw new Error(
            'Only numbers are allowed for minPrice and maxPrice values'
        )
    }

    if (minPrice < 0) {
        throw new Error('Cannot have a minPrice value less than zero')
    }

    return { minPrice, maxPrice }
}

/**DOCU:
 * **********************************************************************
 * - generates a rating model
 * @param reqQuery - the request query of type RatingProps
 * @returns the value of minRating and maxRating
 */
export const ratingModel = async (reqQuery: RatingProps) => {
    const minRating =
        reqQuery.minRating !== undefined
            ? reqQuery.minRating
            : await minRatingValue()

    const maxRating =
        reqQuery.maxRating !== undefined
            ? reqQuery.maxRating
            : await maxRatingValue()

    if (isNaN(Number(minRating)) || isNaN(Number(minRating))) {
        throw new Error('Only numbers are allowed for minRating value')
    }

    if (minRating < 0) {
        throw new Error('Cannot have a minRating value less than zero')
    }

    return { minRating, maxRating }
}
