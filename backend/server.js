import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import helmet from "helmet";
import { authLimiter } from "./middleware/rateLimiter.js";

app.use("/api/auth", authLimiter, authRoutes);

dotenv.config()

connectDB()

const app = express()

app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authLimiter, authRoutes);


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
