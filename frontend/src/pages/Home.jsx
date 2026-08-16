import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
              Secure authentication experience
            </div>

            <h1 className="mb-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Build trust with a{' '}
              <span
                className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                modern auth flow
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-400 lg:mx-0">
              A polished authentication starter built with React, Node.js, and MongoDB.
              Clean visuals, protected routes, and smooth onboarding for your next project.
            </p>

            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90"
              >
                Go to dashboard
              </Link>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Link
                  to="/register"
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:text-white"
                >
                  Sign in →
                </Link>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400 lg:justify-start">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">JWT ready</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Protected routes</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Tailwind UI</span>
            </div>
          </div>

        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            { title: 'JWT Auth', desc: 'Token-based authentication with secure storage', icon: '🔐' },
            { title: 'Protected Routes', desc: 'Role-based access control for your pages', icon: '🛡️' },
            { title: 'Modern Stack', desc: 'Built with React 18, Vite, and Tailwind CSS', icon: '⚡' },
          ].map((item, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-indigo-400/30">
              <div className="mb-4 text-2xl">{item.icon}</div>
              <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home