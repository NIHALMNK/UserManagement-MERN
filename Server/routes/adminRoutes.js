import express from 'express'
const router = express.Router()
import { protect } from '../Middleware/authMiddleware.js'
import {deleteUserByAdmin, getAllUsers, updateUserByAdmin} from '../controllers/adminController/adminPageController.js'
import { adminOnly } from '../Middleware/adminOnly.js'
import { registerUser } from '../controllers/userController/auth.js'
import upload from '../Middleware/upload.js'
import { verifyToken } from '../Middleware/verifyToken .js'

router.get('/dashboard',protect,adminOnly,getAllUsers);
router.post('/add-user',registerUser)
router.put('/update-user/:id', protect,upload.single("image"), updateUserByAdmin)
router.put('/delete-user/:id', verifyToken, deleteUserByAdmin);

export default router
