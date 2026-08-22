import { useAuth } from '../hooks/useAuth.js'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <div className="rounded-[30px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{user?.name}</h1>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'User ID', value: user?._id },
            { label: 'Email Verified', value: user?.isEmailVerified ? 'Yes' : 'No' },
            { label: 'Account Type', value: 'Standard' },
            { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString() },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-sm text-slate-400">{item.label}</span>
              <span className="text-sm font-medium text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
