const fs = require('fs')
const productsJson = require("./productos.json")

class Contenedor {
    constructor(filename) {
        this.filename = filename
    }
    getAllProducts = () => productsJson

    getProductById = (id) => {
        const findProduct = this.getAllProducts().find(products => products.id === id)
        return findProduct ? findProduct : `No se encuentra producto con el id ${id}`
    }
    addProduct = async (title, price, thumbnail) => {
        let newProduct = {
            id: Math.max(...this.getAllProducts().map(product => product.id)) + 1,
            title, price, thumbnail
        }
        productsJson.push(newProduct)
        await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(productsJson))
        return newProduct
    }

    updateProduct = async ({ id, ...rest }) => {
        const indexOfProduct = productsJson.findIndex(product => product.id === id)
        productsJson[indexOfProduct] = { id, ...rest }
        await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(productsJson))

        return `El producto con id ${id} fue actualizado`
    }

    deleteProduct = async (id) => {
        const deletedProductsData = productsJson.filter(product => product.id != id)
        await fs.promises.writeFile(`./src/services/${this.filename}`, JSON.stringify(deletedProductsData))
        return id
    }
}

const productosService = new Contenedor("productos.json")

module.exports = { productosService }
