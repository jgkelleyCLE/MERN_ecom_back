import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import searchRoutes from './routes/searchRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 3001

//MONGOOSE
mongoose.connect(process.env.MONGO_URI)

let connectionObj = mongoose.connection

connectionObj.on('error', ()=> {
    console.log('Error connecting to database')
})

connectionObj.once('connected', ()=> {
    console.log('Connected to database')
})

//ROUTING
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/mail', emailRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/search', searchRoutes)

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
