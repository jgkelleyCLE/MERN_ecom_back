import mongoose from 'mongoose'

const SearchSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    resultsCount: {
        type: Number,
        default: 0
    },
    resultIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    }
}, { timestamps: true })

const Search = mongoose.model('Search', SearchSchema)

export default Search