import { ApiError } from '../utils/apiError.js'

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    console.error(`Unhandled request error: ${err.name || 'Error'}`)
  } else {
    console.error('===== ERROR =====')
    console.error(err)
    console.error(err.stack)
  }

  let error = err

  if (error?.code === 11000) {
    error = new ApiError(409, 'An account with this email already exists')
  }

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message || 'Something went wrong'
    error = new ApiError(statusCode, message, error?.errors || [])
  }

  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    success: false,
    errors: error.errors
  })
}

export { errorHandler }
