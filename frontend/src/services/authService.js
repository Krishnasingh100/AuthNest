import api from './api.js'

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const getProfile = async () => {
  const response = await api.get('/user/profile')
  return response.data
}

export const resendVerification = async (email) => {
  const response = await api.post('/auth/resend-verification', { email })
  return response.data
}

export const requestPasswordReset = async (email) => {
  const response = await api.post('/auth/forgot-password', { email })
  return response.data
}

export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password })
  return response.data
}
