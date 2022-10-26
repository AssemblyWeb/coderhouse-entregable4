const fs = require('fs')
import productsJson from "./productos.json"

const productsData = productsJson 

export const getAllProducts = () => productsData

export const getProductById = (id) => {
    const findProduct = productsData.find(products => products.id === id)
    return findProduct ? findProduct : `No se encuentra producto con el id ${id}`
}

export const addProduct = ({title, price, thumbnail}) => {
    try {        
        
        const newProduct = {
            id: Math.max(...productsData.map(product => product.id)) +1,
            title, price, thumbnail
        }
        
        productsData.push(newProduct)
        fs.promises.writeFileSync('./src/services/productos.json', JSON.stringify(productsData))

        return newProduct

    } catch (error) {
        throw new Error("No se pudo guardar el producto: " + title)
    }
} 

export const deleteProduct = async (id) => {
    try {
        const deletedProductsData = await productsData.filter(product => product.id != id)

        //console.log(deletedProductsData)
        await fs.promises.writeFile(`./productos.json`, deletedProductsData)
        return id
    } catch (error) {
        throw new Error("No se puede eliminar el producto con id: " + id)
    }
}