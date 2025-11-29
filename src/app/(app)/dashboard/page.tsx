"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/api/auth";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-slate-200/80">
            Insights and recent activity will appear here.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
