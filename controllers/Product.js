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

//GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async(req, res) => {
    const category = req.params.category;

    try {
        const products = await Product.find({ category: category });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
