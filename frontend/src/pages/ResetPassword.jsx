import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword as resetPasswordService } from '../services/authService.js'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const response = await resetPasswordService(token, password)

      setSuccess(
        response.message || 'Password reset successfully'
      )

      setPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        navigate('/login')
      }, 2500)

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to reset password. The link may have expired.'
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
            Reset your password
          </h1>

          <p className="mt-3 text-slate-400">
            Enter your new password below
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
              <div className="mt-1 text-xs text-emerald-400/70">
                Redirecting to login...
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* New Password */}
            <div>

              <label
                htmlFor="password"
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                disabled={loading || !!success}
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
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                disabled={loading || !!success}
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
              />

            </div>

            {/* Password requirement */}
            <p className="text-xs text-slate-500">
              Password must be at least 6 characters.
            </p>

            {/* Button */}
            <button
              type="submit"
              disabled={loading || !!success}
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
                ? 'Resetting password...'
                : 'Reset Password'}
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

        {/* Footer text */}
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

export default ResetPassword
