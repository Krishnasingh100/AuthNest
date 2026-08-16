const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950/60 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-center sm:flex-row">
        <p className="text-sm text-slate-400">
          AuthNest — polished authentication UI for modern apps
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>Built with React</span>
          <span>•</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer