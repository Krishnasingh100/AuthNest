import { useAuth } from '../hooks/useAuth.js'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-8 rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-300">Dashboard</p>
            <h1 className="text-3xl font-semibold text-white">
              Hello, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="mt-2 text-slate-400">Here is a quick view of your account overview.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Account status: verified
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">✓</div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">Active</span>
          </div>
          <p className="mb-1 text-sm text-slate-400">Status</p>
          <p className="font-medium text-white">Verified account</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">@</div>
          <p className="mb-1 text-sm text-slate-400">Email</p>
          <p className="truncate font-medium text-white">{user?.email}</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">📅</div>
          <p className="mb-1 text-sm text-slate-400">Joined</p>
          <p className="font-medium text-white">{new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard