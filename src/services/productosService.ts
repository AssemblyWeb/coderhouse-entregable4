const fs = require('fs')
import productsJson from "./productos.json"
import { IProduct, IAddProduct } from "../types/types" 

const productsData: IProduct[] = productsJson as IProduct[]

export const getAllProducts = (): IProduct[] => productsData

export const getProductById = (id: number): IProduct | string => {
    const findProduct = productsData.find(products => products.id === id)
    return findProduct ? findProduct : `No se encuentra producto con el id ${id}`
}

export const addProduct = async ({title, price, thumbnail}: IAddProduct): Promise<IProduct> => {
    try {
        const newProduct = {
            id: Math.max(...productsData.map(product => product.id)) +1,
            title, price, thumbnail
        }
          //  const parsedData = JSON.parse(productsData)
            //const newProductData = productsData.push(newProduct)
            console.log(productsData, newProduct)
            // await fs.promises.writeFile('./src/services/productos.json', JSON.stringify(newProductData))
            return newProduct   
    } catch (error) {
        throw new Error("No se pudo guardar el producto: " + title)
    }
} 

export const deleteProduct = async (id:number) => {
    try {
        const deletedProductsData = await productsData.filter(product => product.id != id)

        //console.log(deletedProductsData)
        await fs.promises.writeFile(`./productos.json`, deletedProductsData)
        return id
    } catch (error) {
        throw new Error("No se puede eliminar el producto con id: " + id)
    }
}