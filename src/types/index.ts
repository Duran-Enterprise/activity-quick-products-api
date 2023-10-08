export type PaginationProps = {
    limit?: number
    skip?: number
}

export type ProductIdProps = {
    productId?: string
}

export type ProductsProps = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export type TitleProps = {
    name?: string
}

export type PriceProps = {
    minPrice?: number
    maxPrice?: number
}

export type BrandProps = {
    name?: string
}

export type RatingProps = {
    minRating?: number
    maxRating?: number
}

export type ReqQueryProps = PaginationProps &
    TitleProps &
    PriceProps &
    BrandProps &
    RatingProps
