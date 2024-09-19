import Order from "../models/orderModel.js";



export const createOrder = async(req, res) => {

    try {
        // const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
        const { title, orderItems, eventDate, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' })
        } else {
            const newOrder = await Order.create({
                // orderItems: orderItems.map(item => ({
                //     ...item,
                //     product: item._id,
                //     _id: undefined
                // })),
                // userId: req.user._id,
                title,
                orderItems,
                eventDate,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })

            res.status(201).json(newOrder)
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getUserOrders = async(req, res) => {

    try {
        
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const getOrderByID = async(req, res) => {

    const id = req.params.id
    try {
        const order = await Order.findById(id).populate('userId', 'name email')
        res.status(200).json(order)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getOrders = async(req, res) => {

    try {
        const orders = await Order.find({}).sort({ createdAt: -1 })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const updateOrderToPaid = async(req, res) => {
    
        try {
            const order = await Order.findById(req.params.id)
            if(order) {
                order.isPaid = true
                order.paidAt = Date.now()
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address
                }
                const updatedOrder = await order.save()
                res.status(200).json(updatedOrder)
            } else {
                res.status(404).json({ message: 'Order not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
}