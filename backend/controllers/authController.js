import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import {sendVerificationEmail,sendPasswordResetEmail} from '../utils/emailService.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// ==================== REGISTER ====================

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new ApiError(400, 'User already exists')
  }

  // Generate secure verification token
  const verificationToken = crypto.randomBytes(32).toString('hex')

  // Hash token before storing it in database
  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex')

  // Token expires in 15 minutes
  const verificationExpires = new Date(
    Date.now() + 15 * 60 * 1000
  )

  const user = await User.create({
    name,
    email,
    password,
    isEmailVerified: false,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: verificationExpires
  })

  // Send verification email
  await sendVerificationEmail(email, verificationToken)

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        }
      },
      'Registration successful. Please check your email to verify your account.'
    )
  )
})

// ==================== VERIFY EMAIL ====================

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params

  if (!token) {
    throw new ApiError(400, 'Verification token is required')
  }

  // Hash the token received from URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  // Find user with valid token and non-expired token
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: new Date() }
  })

  if (!user) {
    throw new ApiError(
      400,
      'Invalid or expired verification token'
    )
  }

  // Mark email as verified
  user.isEmailVerified = true

  // Remove verification token
  user.emailVerificationToken = null
  user.emailVerificationExpires = null

  await user.save()

  res.status(200).json(
    new ApiResponse(
      200,
      {
        email: user.email,
        isEmailVerified: user.isEmailVerified
      },
      'Email verified successfully'
    )
  )
})
// ==================== RESEND VERIFICATION EMAIL ====================

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new ApiError(400, 'Email is required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email is already verified')
  }

  // Generate a new verification token
  const verificationToken = crypto.randomBytes(32).toString('hex')

  // Hash token before storing it
  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex')

  // New token expires in 15 minutes
  user.emailVerificationToken = hashedToken
  user.emailVerificationExpires = new Date(
    Date.now() + 15 * 60 * 1000
  )

  await user.save()

  // Send new verification email
  await sendVerificationEmail(email, verificationToken)

  res.status(200).json(
    new ApiResponse(
      200,
      {},
      'A new verification email has been sent'
    )
  )
});

// ==================== FORGOT PASSWORD ====================

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new ApiError(400, 'Email is required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  // Generate secure reset token
  const resetToken = crypto.randomBytes(32).toString('hex')

  // Hash token before storing it
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Token expires in 15 minutes
  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = new Date(
    Date.now() + 15 * 60 * 1000
  )

  await user.save()

  // Send password reset email
  await sendPasswordResetEmail(email, resetToken)

  res.status(200).json(
    new ApiResponse(
      200,
      {},
      'Password reset email has been sent'
    )
  )
});

// ==================== RESET PASSWORD ====================

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  if (!token) {
    throw new ApiError(400, 'Reset token is required')
  }

  if (!password) {
    throw new ApiError(400, 'New password is required')
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      'Password must be at least 6 characters'
    )
  }

  // Hash token received from URL
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  // Find user with valid reset token
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() }
  })

  if (!user) {
    throw new ApiError(
      400,
      'Invalid or expired password reset token'
    )
  }

  // Set new password
  user.password = password

  // Remove reset token
  user.resetPasswordToken = null
  user.resetPasswordExpires = null

  await user.save()

  res.status(200).json(
    new ApiResponse(
      200,
      {},
      'Password reset successfully'
    )
  )
})

// ==================== LOGIN ====================

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  // Don't allow unverified users to login
  if (!user.isEmailVerified) {
    throw new ApiError(
      403,
      'Please verify your email before logging in'
    )
  }

  // Check password
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password')
  }

  // Generate JWT
  const token = generateToken(user._id)

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        },
        token
      },
      'Login successful'
    )
  )
})

// ==================== LOGOUT ====================

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {},
      'Logged out successfully'
    )
  )
})