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
        const products = await Product.find({ 
            category: category,
            product: { $not: { $regex: /Festival|Pole Tent|50 x/i } }
         });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


//SEARCH PRODUCTS
export const searchProducts = async(req, res) => {

    const query = req.query.q

    try {
        
        const products = await Product.find({ 
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