import express from 'express'
import { getProducts, getProduct, getProductsByCategory, searchProducts, getAllExcludeInactive, updateProductStatus, getActiveProductsByCategory, editProduct } from '../controllers/Product.js'

const router = express.Router()

//search products
router.get('/search', searchProducts)

//get all products
router.get('/', getProducts)

//get active products by category
router.get('/active/:category', getActiveProductsByCategory)

//get all products that are active or on sale
router.get('/active', getAllExcludeInactive)



//get single product
router.get('/:id', getProduct)

//get products by category
router.get('/category/:category', getProductsByCategory)

//update product status
router.put('/:id/status', updateProductStatus)

//edit product tags
router.put('/tags/:id', editProduct)

export default router