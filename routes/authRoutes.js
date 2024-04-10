import express from 'express'
import { googleSignIn } from '../controllers/User.js'

const router = express.Router()

router.post('/login', googleSignIn)

export default router