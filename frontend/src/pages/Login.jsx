import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import InputField from '../components/InputField.jsx'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: ''
    })

    setApiError('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setApiError('')

    if (!validateForm()) {
      return
    }

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
        error?.message ||
        'Invalid email or password'
      )
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="text-indigo-400 text-xl mb-4">
            ✦
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome back
          </h1>

          <p className="mt-3 text-slate-400">
            Enter your credentials to continue
          </p>

        </div>

        {/* Login Card */}
        <div className="
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          shadow-2xl
        ">

          {/* API Error */}
          {apiError && (
            <div className="
              mb-5
              rounded-lg
              border border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-300
            ">
              {apiError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
            />

            {/* Password */}
            <div>
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
              />

              {/* Forgot Password */}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="
                    text-sm
                    text-indigo-400
                    hover:text-indigo-300
                    transition-colors
                  "
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="
                w-full
                rounded-lg
                bg-indigo-600
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-indigo-500
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/40
              "
            >
              Sign In
            </button>

          </form>

          {/* Register */}
          <div className="mt-6 text-center">

            <p className="text-sm text-slate-400">
              Don't have an account?{' '}

              <Link
                to="/register"
                className="
                  text-indigo-400
                  hover:text-indigo-300
                  transition-colors
                  font-medium
                "
              >
                Create one
              </Link>
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="
          mt-8
          text-center
          text-xs
          text-slate-500
        ">
          AuthNest — polished authentication UI for modern apps
        </p>

      </div>

    </div>
  )
}

export default Login
