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
        try {
            const newProduct = {
                id: Math.max(...productsData.map(product => product.id)) + 1,
                title, price, thumbnail
            }
            productsData.push(newProduct)
            await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(productsData))
    
            return newProduct   
        } catch (error) {
            throw new Error("No se pudo guardar el producto: " + title)
        }
    } 

    updateProduct = async ({id, ...restOfArguments}: IProduct): Promise<number | undefined> => {
        try {
            const indexOfProduct = productsData.findIndex(product => product.id === id) 
            productsData[indexOfProduct] = {id, ...restOfArguments}
            await fs.promises.writeFile('./src/services/productos.json', JSON.stringify(productsData))
    
            return id
        } catch (error) {
            throw new Error("No se pudo actualizar el producto")
        }
    }
    
    deleteProduct = async (id:number) => {
        try {
            const deletedProductsData = productsData.filter(product => product.id != id)
            await fs.promises.writeFile(`./src/services/productos.json`, JSON.stringify(deletedProductsData))
    
            return id
        } catch (error) {
            throw new Error("No se puede eliminar el producto con id: " + id)
        }
    }

}

export const productosService = new Contenedor("productos.json")
