import express from 'express'
import { getProducts, getProduct, getProductsByCategory, searchProducts } from '../controllers/Product.js'

const router = express.Router()

//search products
router.get('/search', searchProducts)

//get all products
router.get('/', getProducts)

//get single product
router.get('/:id', getProduct)

//get products by category
router.get('/category/:category', getProductsByCategory)



export default router