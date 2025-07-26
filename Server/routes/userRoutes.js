import express from 'express'
const router = express.Router()
import { loginUser, registerUser } from '../controllers/userController/auth.js'
import { protect } from '../Middleware/authMiddleware.js'
import { setProfile } from '../controllers/userController/PagesController.js'

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get('/profile',protect,setProfile )

export default router

