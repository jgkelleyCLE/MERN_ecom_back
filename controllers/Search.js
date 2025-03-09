import Search from "../models/searchModel.js";


//get all search terms
export const getAllSearches = async(req, res) => {

    try {
        const searches = await Search.find().sort({ createdAt: -1 })
        res.json(searches)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//create search
export const createSearch = async (req, res) => {
    try {
        const { term, resultsCount, resultIds } = req.body;
        
        const newSearch = await Search.create({
            term,
            resultsCount,
            resultIds 
        });
        
        res.status(201).json(newSearch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};