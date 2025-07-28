import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import {getAllUsers} from '../controllers/adminController/adminPageController.js'
import { adminOnly } from '../Middleware/adminOnly.js'

router.get('/dashboard',protect,adminOnly,getAllUsers)

export default router
