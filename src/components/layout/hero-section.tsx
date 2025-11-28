export function HeroSection() {
  return (
    <div className="max-w-xl space-y-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-teal-100 shadow-lg shadow-teal-950/40">
        Bankapp • Secure by design
      </span>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          Your business finances in one secure view
        </h1>
        <p className="text-lg text-slate-200/80">
          Sign in to see balances, move money, and manage cards with a flow built for speed and safety.
          Encrypted sessions and secure cookies keep your access protected.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm text-slate-100/80 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/30">
          <p className="font-semibold text-white">Layered protection</p>
          <p className="text-slate-200/80">
            Multi-step identity checks and secure sessions keep every login personal and private.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/30">
          <p className="font-semibold text-white">Real-time insights</p>
          <p className="text-slate-200/80">
            Jump straight into your dashboard to track cashflow, latest transfers, and alerts in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
