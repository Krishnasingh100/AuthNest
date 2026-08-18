import { z } from 'zod'
import { ApiError } from '../utils/apiError.js'

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters')
})

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .toLowerCase(),

  password: z
    .string()
    .min(1, 'Password is required')
})

export const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body)

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(', ')

    return next(new ApiError(400, message))
  }

  // Use Zod's cleaned/normalized data
  req.body = result.data

  next()
}

export const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body)

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(', ')

    return next(new ApiError(400, message))
  }

  req.body = result.data

  next()
}