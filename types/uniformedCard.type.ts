export interface UniformedDataType {
    id: string | number
    name: string
    images: {
        small: string
        large: string
    }
    prices: {
        tcgplayer?: {
            url: string
            price: number
        }
        cardmarket?: {
            url: string
            price: number
        }   
    }
}