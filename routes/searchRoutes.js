import express from 'express'
import { createSearch, getAllSearches, getSearchById } from '../controllers/Search.js'

const router = express.Router()

//get all searches
router.get('/', getAllSearches)

//create Search
router.post('/', createSearch)

//get search by id
router.get('/:id', getSearchById)

export default router