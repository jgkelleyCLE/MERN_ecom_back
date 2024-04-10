import express from 'express'
import { getProducts, getProduct, getProductsByCategory } from '../controllers/Product.js'

const router = express.Router()

//get all products
router.get('/', getProducts)

//get single product
router.get('/:id', getProduct)

//get products by category
router.get('/category/:category', getProductsByCategory)

export default router