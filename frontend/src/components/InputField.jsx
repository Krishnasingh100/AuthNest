const InputField = ({ label, type, name, value, onChange, placeholder, error }) => {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
      />
      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
    </div>
  )
}

export default InputField