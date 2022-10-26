const fs = require('fs')
const productsJson = require("./productos.json")

const getAllProducts = () => productsJson

const getProductById = (id) => {
    const findProduct = productsData.find(products => products.id === id)
    return findProduct ? findProduct : `No se encuentra producto con el id ${id}`
}

const addProduct = async ({ title, price, thumbnail }) => {
    try {
        let newProduct = {
            id: Math.max(...productsJson.map(product => product.id)) + 1,
            title, price, thumbnail
        }

        productsJson.push(newProduct)

        await fs.promises.writeFile('./src/services/productos.json', JSON.stringify(productsJson))

        return newProduct

    } catch (error) {
        throw new Error("No se pudo guardar el producto: " + title)
    }
}

const updateProduct = async (id, title, price, thumbnail) => {
    try {
        const indexOfProduct = productsJson.findIndex(product => product.id === id)
        productsJson[indexOfProduct] = { id, title, price, thumbnail }

        await fs.promises.writeFile('./src/services/productos.json', JSON.stringify(productsJson))

        return `El producto con id ${id} fue actualizado`
    } catch (error) {
        throw new Error("No ")
    }
}

const deleteProduct = async (id) => {
    try {
        const deletedProductsData = productsJson.filter(product => product.id != id)

        await fs.promises.writeFile(`./src/services/productos.json`, JSON.stringify(deletedProductsData))
        return id
    } catch (error) {
        throw new Error("No se puede eliminar el producto con id: " + id)
    }
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }
