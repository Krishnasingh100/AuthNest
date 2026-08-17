import { ApiError } from '../utils/apiError.js'

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return next(new ApiError(400, 'All fields are required'))
  }

  if (password.length < 6) {
    return next(new ApiError(400, 'Password must be at least 6 characters'))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, 'Invalid email format'))
  }

  next()
}

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ApiError(400, 'Email and password are required'))
  }

  next()
}
