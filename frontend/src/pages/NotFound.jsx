import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="max-w-md rounded-[30px] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">
        <div className="mb-5 text-7xl font-semibold text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text">
          404
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-white">Page not found</h1>
        <p className="mb-8 text-slate-400">The page you are looking for doesn’t exist or may have moved.</p>
        <Link
          to="/"
          className="inline-flex items-center rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound