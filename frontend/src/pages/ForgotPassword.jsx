import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestPasswordReset } from '../services/authService.js'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    try {
      setLoading(true)

      const response = await requestPasswordReset(email)

      setSuccess(
        response.message ||
        'Password reset email has been sent'
      )

      setEmail('')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to send reset email'
      )
    } finally {
      setLoading(false)
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
            Forgot your password?
          </h1>

          <p className="mt-3 text-slate-400">
            Enter your email and we'll send you a
            password reset link.
          </p>

        </div>

        {/* Card */}
        <div className="
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          shadow-2xl
        ">

          {/* Error */}
          {error && (
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
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="
              mb-5
              rounded-lg
              border border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-3
              text-sm
              text-emerald-300
            ">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                disabled={loading}
                className="
                  w-full
                  rounded-lg
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  py-3
                  text-white
                  placeholder-slate-500
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                  disabled:opacity-50
                "
                required
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? 'Sending...'
                : 'Send Reset Link'}
            </button>

          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="
                text-sm
                text-slate-400
                transition
                hover:text-white
              "
            >
              ← Back to login
            </button>

          </div>

        </div>

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

export default ForgotPassword
