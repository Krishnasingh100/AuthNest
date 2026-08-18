import { Router } from 'express'

import {
  register,
  login,
  logout
} from '../controllers/authController.js'

import {
  validateRegister,
  validateLogin
} from '../middleware/validationMiddleware.js'

const router = Router()


// =====================================================
// REGISTER
// =====================================================

router.post(
  '/register',
  validateRegister,
  register
)


// =====================================================
// LOGIN
// =====================================================

router.post(
  '/login',
  validateLogin,
  login
)


// =====================================================
// LOGOUT
// =====================================================

router.post(
  '/logout',
  logout
)


// =====================================================
// EMAIL VERIFICATION - TEMPORARILY DISABLED
// =====================================================

/*
// Verify email
router.get(
  '/verify-email/:token',
  verifyEmail
)

// Resend verification email
router.post(
  '/resend-verification',
  resendVerificationEmail
)
*/


// =====================================================
// PASSWORD RESET - TEMPORARILY DISABLED
// =====================================================

/*
// Forgot password
router.post(
  '/forgot-password',
  forgotPassword
)

// Reset password
router.post(
  '/reset-password/:token',
  resetPassword
)
*/


export default router

