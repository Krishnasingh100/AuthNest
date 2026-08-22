const requiredEnvironmentVariables = [
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
  'CLIENT_URL',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL'
]

export const validateEnvironment = () => {
  const missing = requiredEnvironmentVariables.filter((name) => !process.env[name]?.trim())

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
