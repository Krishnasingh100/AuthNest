import { useCallback, useEffect, useState } from 'react'
import { login as loginService, register as registerService, getProfile } from '../services/authService.js'
import { AuthContext } from './authContext.js'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getProfile()
      setUser(data.data)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localStorage.getItem('token')) {
        fetchProfile()
      } else {
        setLoading(false)
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [fetchProfile])

  const login = async (email, password) => {
    const data = await loginService(email, password)
    localStorage.setItem('token', data.data.token)
    setUser(data.data.user)
    return data
  }

  const register = async (name, email, password) => {
    const data = await registerService(name, email, password)
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
