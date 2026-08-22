import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/emailService.js'

const TOKEN_LIFETIME_MS = 15 * 60 * 1000
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

const createStoredToken = () => {
  const token = crypto.randomBytes(32).toString('hex')
  const hash = crypto.createHash('sha256').update(token).digest('hex')
  return { token, hash, expires: new Date(Date.now() + TOKEN_LIFETIME_MS) }
}

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt
})

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (await User.findOne({ email })) throw new ApiError(409, 'An account with this email already exists')

  const verification = createStoredToken()
  const user = await User.create({ name, email, password, isEmailVerified: false, emailVerificationToken: verification.hash, emailVerificationExpires: verification.expires })
  const verificationLink = await sendVerificationEmail(email, verification.token)
  const data = { user: publicUser(user) }
  if (process.env.NODE_ENV !== 'production') data.verificationLink = verificationLink

  res.status(201).json(new ApiResponse(201, data, 'Registration successful. Please verify your email.'))
})

export const verifyEmail = asyncHandler(async (req, res) => {
  const tokenHash = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({ emailVerificationToken: tokenHash, emailVerificationExpires: { $gt: new Date() } })
  if (!user) throw new ApiError(400, 'Invalid or expired verification token')

  user.isEmailVerified = true
  user.emailVerificationToken = null
  user.emailVerificationExpires = null
  await user.save()
  res.status(200).json(new ApiResponse(200, { user: publicUser(user) }, 'Email verified successfully'))
})

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) throw new ApiError(400, 'Email is required')
  const user = await User.findOne({ email: email.trim().toLowerCase() })
  if (!user) throw new ApiError(404, 'User not found')
  if (user.isEmailVerified) throw new ApiError(400, 'Email is already verified')

  const verification = createStoredToken()
  user.emailVerificationToken = verification.hash
  user.emailVerificationExpires = verification.expires
  await user.save()
  const verificationLink = await sendVerificationEmail(user.email, verification.token)
  const data = process.env.NODE_ENV !== 'production' ? { verificationLink } : {}
  res.status(200).json(new ApiResponse(200, data, 'A new verification email has been sent'))
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) throw new ApiError(400, 'Email is required')
  const user = await User.findOne({ email: email.trim().toLowerCase() })
  if (!user) throw new ApiError(404, 'User not found')

  const reset = createStoredToken()
  user.resetPasswordToken = reset.hash
  user.resetPasswordExpires = reset.expires
  await user.save()
  const resetLink = await sendPasswordResetEmail(user.email, reset.token)
  const data = process.env.NODE_ENV !== 'production' ? { resetLink } : {}
  res.status(200).json(new ApiResponse(200, data, 'Password reset instructions have been sent'))
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  if (!password || password.length < 6 || password.length > 100) throw new ApiError(400, 'Password must be between 6 and 100 characters')

  const tokenHash = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: new Date() } })
  if (!user) throw new ApiError(400, 'Invalid or expired password reset token')

  user.password = password
  user.resetPasswordToken = null
  user.resetPasswordExpires = null
  await user.save()
  res.status(200).json(new ApiResponse(200, {}, 'Password reset successfully'))
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid email or password')

  const token = generateToken(user._id)
  res.status(200).json(new ApiResponse(200, { user: publicUser(user), token }, 'Login successful'))
})

// Bearer JWTs are stateless. Logging out is intentionally a client-side action.
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'))
})
