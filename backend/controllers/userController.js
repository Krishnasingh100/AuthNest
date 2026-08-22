import User from '../models/User.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires')

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  res.status(200).json(
    new ApiResponse(200, user, 'Profile fetched successfully')
  )
})

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body

  if (!name || !name.trim() || name.trim().length < 2 || name.trim().length > 50) {
    throw new ApiError(400, 'Name must be between 2 and 50 characters')
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new ApiError(400, 'A valid email is required')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const duplicate = await User.findOne({ email: normalizedEmail, _id: { $ne: req.user._id } })
  if (duplicate) throw new ApiError(409, 'An account with this email already exists')

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name: name.trim(), email: normalizedEmail },
    { new: true, runValidators: true }
  ).select('-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires')

  if (!user) throw new ApiError(404, 'User not found')

  res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  )
})
