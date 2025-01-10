import express from 'express'

import isLoggedin from '../middlewares/isLoggedin.js'
import login from '../controllers/authController/login.js'
import register from '../controllers/authController/register.js'
import resetPassword from '../controllers/authController/resetPassword.js'
import forgotPassword from '../controllers/authController/forgotPassword.js'
import updatePassword from '../controllers/authController/updatePassword.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/forgot-password', forgotPassword)

router.patch('/reset-password', resetPassword)
router.patch('/update-password', isLoggedin, updatePassword)

export default router
