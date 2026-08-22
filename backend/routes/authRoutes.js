import { Router } from 'express'
import { forgotPassword, login, logout, register, resendVerificationEmail, resetPassword, verifyEmail } from '../controllers/authController.js'
import { validateLogin, validateRegister } from '../middleware/validationMiddleware.js'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/logout', logout)
router.get('/verify-email/:token', verifyEmail)
router.post('/resend-verification', resendVerificationEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
