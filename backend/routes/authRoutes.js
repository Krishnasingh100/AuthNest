import { Router } from 'express'

import {
  register,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js'

import {
  validateRegister,
  validateLogin
} from '../middleware/validationMiddleware.js'

const router = Router()

// Register
router.post('/register', validateRegister, register)

// Login
router.post('/login', validateLogin, login)

// Logout
router.post('/logout', logout)

// Verify email
router.get('/verify-email/:token', verifyEmail)

// Resend verification email
router.post('/resend-verification', resendVerificationEmail)

// Forgot password
router.post('/forgot-password', forgotPassword)

// Reset password
router.post('/reset-password/:token', resetPassword)

export default router