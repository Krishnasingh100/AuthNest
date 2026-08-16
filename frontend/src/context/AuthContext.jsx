import { createContext, useState, useEffect } from 'react'
import { login as loginService, register as registerService, getProfile } from '../services/authService.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await getProfile()
      setUser(data.data)
    } catch (err) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const data = await loginService(email, password)
    localStorage.setItem('token', data.data.token)
    setUser(data.data.user)
    return data
  }

  const register = async (name, email, password) => {
    const data = await registerService(name, email, password)
    localStorage.setItem('token', data.data.token)
    setUser(data.data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}