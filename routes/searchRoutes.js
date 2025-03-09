import express from 'express'
import { createSearch, getAllSearches } from '../controllers/Search.js'

const router = express.Router()

//get all searches
router.get('/', getAllSearches)

//create Search
router.post('/', createSearch)

export default router