import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import helmet from 'helmet'
import { authLimiter } from './middleware/rateLimiter.js'
import { validateEnvironment } from './config/env.js'
import { ApiError } from './utils/apiError.js'

dotenv.config()
validateEnvironment()

const app = express()

// Connect MongoDB
connectDB()

// Security
app.use(helmet())

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const clientUrl = process.env.CLIENT_URL

app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === clientUrl) return callback(null, true)
    return callback(new ApiError(403, 'Origin is not allowed by CORS'))
  },
  credentials: true
}))

// Routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/user', userRoutes)

// Health check
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  })
})

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
