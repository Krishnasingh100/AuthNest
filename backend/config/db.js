import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(process.env.NODE_ENV === 'production' ? 'MongoDB connection failed' : `MongoDB connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
