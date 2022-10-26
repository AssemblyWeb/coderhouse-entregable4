const express = require('express')
const router = express.Router()
const productosService = require('../services/productosService')


router.get('/', (_req, res) => {
    const allProducts = productosService.getAllProducts()
    res.status(200).json(allProducts)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const productos = productosService.getProductById(+id)
    res.status(200).json(productos)
})
router.post('/',  (req, res) => {
    try {
        const { title, price, thumbnail } = req.body
        const addProduct =  productosService.addProduct({title, price, thumbnail})
    
        res.status(200).json(addProduct)    
    } catch (error) {
        res.status(404).json({error: "Hubo un error"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deleteProduct = await productosService.deleteProduct(+id)
    
        res.status(200).json(`El producto con id ${deleteProduct} fue eliminado`)
        
    } catch (error) {
        res.status(404).json("No se pudo borrar el id " + req.params.id)
    }
})




export default router