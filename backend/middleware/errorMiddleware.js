import { ApiError } from '../utils/apiError.js'

const errorHandler = (err, req, res, next) => {
  console.error("===== ERROR =====")
  console.error(err)
  console.error(err.stack)

  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Something went wrong'
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