import * as fs from 'fs'
import products from "./productos.json"
import { IProduct, IAddProduct } from "../types/types" 

const productsData: IProduct[] = products as IProduct[]

export class Contenedor {
    public filename: string
    constructor(filename: string) {
        this.filename = filename
    }
    getAllProducts = (): IProduct[] => productsData as IProduct[]

    getProductById = (id: number): IProduct | undefined => {
        const findProduct = productsData.find(products => products.id === id)
    
        return findProduct
    }

    addProduct = async ({title, price, thumbnail}: IAddProduct): Promise<IProduct> => {
            const newProduct = {
                id: Math.max(...productsData.map(product => product.id)) + 1,
                title, price, thumbnail
            }
            productsData.push(newProduct)
            await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(productsData))
    
            return newProduct   
    } 

    updateProduct = async ({id, ...restOfArguments}: IProduct): Promise<number | undefined> => {
            const indexOfProduct = productsData.findIndex(product => product.id === id) 
            productsData[indexOfProduct] = {id, ...restOfArguments}
            await fs.promises.writeFile('./src/services/productos.json', JSON.stringify(productsData))
    
            return id
    }
    
    deleteProduct = async (id:number) => {
            const deletedProductsData = productsData.filter(product => product.id != id)
            await fs.promises.writeFile(`./src/services/productos.json`, JSON.stringify(deletedProductsData))
    
            return id

    }

}

export const productosService = new Contenedor("productos.json")
