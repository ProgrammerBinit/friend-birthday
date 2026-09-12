export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/20 px-6 py-14 text-center">
      {/* Decorative glow */}
      <div className="absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        {/* Heart */}
        <div className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/40" />
          <span className="text-xs text-zinc-600">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/40" />
        </div>

        <p className="text-xs text-zinc-500">
          A little birthday surprise, made especially for you.
        </p>

        <p className="mt-6 text-xs text-zinc-600">
          Designed & Developed by{" "}
          <span className="font-medium text-zinc-300">B.K Singh</span>
        </p>
        <div className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/40" />
          <span className="text-xs text-zinc-600">❤️</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/40" />
        </div>
      </div>
    </footer>
  );
}
