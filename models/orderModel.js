import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    orderItems: [
        {
            product: { type: String, required: false },
            cartQuantity: { type: Number, required: false },
            image: { type: String, required: false},
            price: { type: Number, required: false },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'Product'
            }
        }
    ],
    eventDate: {
        type: String,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

export default Order