import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth/auth-guard";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AuthGuard>{children}</AuthGuard>
    </div>
  );
}
