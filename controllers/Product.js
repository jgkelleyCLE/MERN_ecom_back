import Product from '../models/productModel.js';


//GET ALL PRODUCTS
export const getProducts = async(req, res) => {

    try {
        
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json({ message: error.message })        
    }

}

//GET SINGLE PRODUCT
export const getProduct = async(req, res) => {

    const id = req.params.id;

    try {
        
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//get all products -- exclude inactive products
export const getAllExcludeInactive = async(req, res) => {

    try {
        
        const products = await Product.find({ active: true, sale: true });
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async(req, res) => {
    const category = req.params.category;

    try {
        const products = await Product.find({ 
            category: category,
            product: { $not: { $regex: /Festival|Pole Tent|50 x/i } }
         });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//get products by category -- exclude inactive
export const getActiveProductsByCategory = async(req, res) => {

    const category = req.params.category;

    try {
        
        const products = await Product.find({
            category,
            status: "Active"
        })
        res.status(200).json(products)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


//SEARCH PRODUCTS
export const searchProducts = async(req, res) => {

    const query = req.query.q

    try {
        
        const products = await Product.find({ 
            status: "Active",
            $or: [
                {product: { $regex: query, $options: "i" }},
                {category: { $regex: query, $options: "i" }},
                {tags: { $regex: query, $options: "i" }}
            ]
            }).limit(40)
        res.status(200).json(products)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

//update product status
export const updateProductStatus = async(req, res) => {

    const id = req.params.id;
    const { status } = req.body

    try {
        
        const product = await Product.findByIdAndUpdate(id, {
            status
        }, { new: true })
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//edit product
export const editProduct = async(req, res) => {

    const id = req.params.id
    const { tags } = req.body

    try {
        
        const product = await Product.findByIdAndUpdate(id, {
            tags
        }, { new: true })
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}