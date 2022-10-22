export interface IProduct {
    id: number
    title: string
    price: number
    thumbnail: string
}

export type IAddProduct = Omit<IProduct, "id">