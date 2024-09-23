import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema)

export { Review }

const ProductSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    product: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    schematic: {
        type: String,
        required: false
    },
    parts: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                auto: true
            },
            item: {
                type: String,
                required: false
            },
            quantity: {
                type: Number,
                required: false
            },
            completed: {
                type: Boolean,
                required: false,
                default: false
            },
            completedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                // default: null
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)

export default Product