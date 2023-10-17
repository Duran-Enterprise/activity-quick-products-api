import {
    PaginationProps,
    TitleProps,
    PriceProps,
    RatingProps,
} from '../../types'
import {
    maxPriceValue,
    maxRatingValue,
    minRatingValue,
    throwNewError,
} from '../../utils/benok'

export const paginationModel = (reqQuery: PaginationProps) => {
    const limit = reqQuery.limit !== undefined ? Number(reqQuery.limit) : 5
    const skip = reqQuery.skip !== undefined ? Number(reqQuery.skip) : 0

    // HANDLING ERRORS
    const errors: string[] = []

    if (isNaN(Number(limit)) || isNaN(Number(skip))) {
        errors.push('Only numbers are allowed for limit and skip values')
    }

    if (limit < 0 || skip < 0) {
        errors.push('Cannot have negative values for limit and skip')
    }

    throwNewError(errors)

    return { limit, skip }
}

export const titleModel = (reqQuery: TitleProps) => {
    const name = reqQuery.name || ''
    return { name }
}

export const priceModel = async (reqQuery: PriceProps) => {
    const maxPriceValueRecord = await maxPriceValue()

    const minPrice = reqQuery.minPrice !== undefined ? reqQuery.minPrice : 0

    const maxPrice =
        reqQuery.maxPrice !== undefined
            ? reqQuery.maxPrice
            : maxPriceValueRecord

    // HANDLING ERRORS
    const errors: string[] = []

    if (isNaN(Number(minPrice)) || isNaN(Number(maxPrice))) {
        errors.push('Only numbers are allowed for minPrice and maxPrice values')
    }

    if (minPrice < 0 || maxPrice < 0) {
        errors.push('Cannot have a price value less than zero')
    }

    if (maxPrice > maxPriceValueRecord) {
        errors.push(
            `The maximum price on record is currently ${maxPriceValueRecord}. Please provide a lower value.`
        )
    }

    throwNewError(errors)

    return { minPrice, maxPrice }
}

export const ratingModel = async (reqQuery: RatingProps) => {
    const minRatingValueRecord = await minRatingValue()
    const maxRatingValueRecord = await maxRatingValue()

    const minRating =
        reqQuery.minRating !== undefined
            ? reqQuery.minRating
            : minRatingValueRecord

    const maxRating =
        reqQuery.maxRating !== undefined
            ? reqQuery.maxRating
            : maxRatingValueRecord

    // HANDLING ERRORS
    const errors: string[] = []

    if (isNaN(Number(minRating)) || isNaN(Number(maxRating))) {
        errors.push('Only numbers are allowed for minRating value')
    }

    if (minRating < minRatingValueRecord || maxRating < minRatingValueRecord) {
        errors.push(`Currently no rating records below ${minRatingValueRecord}`)
    }

    if (maxRating > maxRatingValueRecord || minRating > maxRatingValueRecord) {
        errors.push(`Currently no rating records above ${maxRatingValueRecord}`)
    }

    throwNewError(errors)

    return { minRating, maxRating }
}
