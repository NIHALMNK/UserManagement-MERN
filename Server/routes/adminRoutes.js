import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import {getAllUsers} from '../controllers/adminController/adminPageController.js'
import { adminOnly } from '../Middleware/adminOnly.js'
import { registerUser } from '../controllers/userController/auth.js'

router.get('/dashboard',protect,adminOnly,getAllUsers);
router.post('/add-user',registerUser)

export default router
