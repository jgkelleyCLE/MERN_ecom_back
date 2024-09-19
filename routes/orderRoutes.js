import express from 'express'
import { createOrder, getOrderByID, getOrders, getUserOrders, updateOrderToPaid } from '../controllers/Order.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

//create order
router.post('/', createOrder)

//get all orders
router.get('/', getOrders)

//get user orders
router.get('/user/:id', auth, getUserOrders)

//get order by id
router.get('/:id', auth, getOrderByID)

//update order to paid
router.put('/:id/pay', auth, updateOrderToPaid)

export default router