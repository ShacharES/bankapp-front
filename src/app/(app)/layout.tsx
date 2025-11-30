import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth/auth-guard";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-rose-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.04),transparent_30%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative">
        <AuthGuard>{children}</AuthGuard>
      </div>
    </div>
  );
}
