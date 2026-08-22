import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api.js'
import { resendVerification } from '../services/authService.js'

const VerifyEmail = () => {
  const { token } = useParams()
  const [state, setState] = useState({ loading: true, message: '' })
  const [email, setEmail] = useState('')
  const [resendState, setResendState] = useState({ loading: false, message: '', error: '' })

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`)
        setState({ loading: false, message: response.data.message })
      } catch (error) {
        setState({ loading: false, message: error.response?.data?.message || 'Unable to verify this email link.' })
      }
    }
    verify()
  }, [token])

  const handleResend = async (event) => {
    event.preventDefault()
    setResendState({ loading: true, message: '', error: '' })

    try {
      const response = await resendVerification(email)
      setResendState({ loading: false, message: response.message, error: '' })
    } catch (error) {
      setResendState({
        loading: false,
        message: '',
        error: error.response?.data?.message || 'Unable to resend the verification email.'
      })
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-semibold text-white">Email verification</h1>
        <p className="mt-4 text-slate-300">{state.loading ? 'Verifying your email…' : state.message}</p>
        {!state.loading && (
          <form onSubmit={handleResend} className="mt-6 space-y-3 text-left">
            <label className="block text-sm text-slate-300" htmlFor="resend-email">Need a new link?</label>
            <input
              id="resend-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              disabled={resendState.loading}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder-slate-500 outline-none focus:border-indigo-500 disabled:opacity-50"
            />
            {resendState.error && <p className="text-sm text-rose-300">{resendState.error}</p>}
            {resendState.message && <p className="text-sm text-emerald-300">{resendState.message}</p>}
            <button type="submit" disabled={resendState.loading} className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50">
              {resendState.loading ? 'Sending…' : 'Resend verification email'}
            </button>
          </form>
        )}
        {!state.loading && <Link to="/login" className="mt-6 inline-block text-indigo-300 hover:text-indigo-200">Go to login</Link>}
      </div>
    </div>
  )
}

export default VerifyEmail
