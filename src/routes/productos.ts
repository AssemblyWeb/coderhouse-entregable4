import express from 'express'
const router = express.Router()
import * as productosService from '../services/productosService'


router.get('/', (_req, res) => {
    try {
        const allProducts = productosService.getAllProducts()
        
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(400).json({ error })        
    }
})

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params
        const productos = productosService.getProductById(+id)
        
        res.status(200).json(productos)
    } catch (error) {
        res.status(400).json({ error })        
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body
        const addProduct = await productosService.addProduct({title, price, thumbnail})
    
        res.status(200).json(addProduct)    
    } catch (error) {
        res.status(404).json({error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, price, thumbnail } = req.body
        const productArguments = {
            id: +id,
            title, 
            price: +price, 
            thumbnail
        }
        const updateProduct = await productosService.updateProduct(productArguments)

        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(400).json({ error })
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