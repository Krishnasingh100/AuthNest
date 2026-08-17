import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new ApiError(400, 'User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  const token = generateToken(user._id)

  res.status(201).json(
    new ApiResponse(201, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    }, 'User registered successfully')
  )
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = generateToken(user._id)

  res.status(200).json(
    new ApiResponse(200, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    }, 'Login successful')
  )
})

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'))
})
