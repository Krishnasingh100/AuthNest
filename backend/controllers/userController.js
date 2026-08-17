import User from '../models/User.js'
import { ApiResponse } from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  res.status(200).json(
    new ApiResponse(200, user, 'Profile fetched successfully')
  )
})

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  ).select('-password')

  res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  )
})
