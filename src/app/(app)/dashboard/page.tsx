"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { logout } from "@/lib/api/auth";
import { type Account, getAccounts } from "@/lib/api/accounts";

export default function DashboardPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAccounts();
        setAccounts(response);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to load accounts right now.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const totalBalance = useMemo(() => {
    if (!accounts.length) return null;
    const primaryCurrency = accounts[0]?.currency || "USD";
    const total = accounts
      .filter((account) => account.currency === primaryCurrency)
      .reduce((sum, account) => sum + account.balance, 0);
    return { amount: total, currency: primaryCurrency };
  }, [accounts]);

  const ownerName = accounts[0]?.owner;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.07),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.1),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(52,211,153,0.07),transparent_30%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10 space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-200/80">
              {ownerName ? `Hi ${ownerName}` : "Dashboard"}
            </p>
            <h1 className="text-3xl font-semibold text-white">Your accounts</h1>
            <p className="mt-1 text-slate-200/80">
              Live balances pulled straight from the API.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push("/transfers")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-900/40 transition hover:scale-[1.01]"
            >
              New transfer
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-inner shadow-slate-900/40">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-200/80">Total balance</p>
              {totalBalance ? (
                <p className="text-3xl font-semibold text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: totalBalance.currency,
                  }).format(totalBalance.amount)}
                </p>
              ) : (
                <p className="text-2xl font-semibold text-white">
                  {loading ? "Loading..." : "No accounts yet"}
                </p>
              )}
            </div>
            <div className="flex gap-2 text-xs text-slate-200/80">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Synced now
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {accounts.length} account{accounts.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-inner shadow-slate-900/40">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Accounts</h2>
            <button
              onClick={() => router.push("/accounts")}
              className="text-sm font-semibold text-teal-200 hover:text-teal-100"
            >
              Manage
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-xl border border-rose-400/40 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
              {error}
            </p>
          )}

          {loading ? (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-2xl bg-white/10"
                />
              ))}
            </div>
          ) : accounts.length ? (
            <div className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/5">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">Account #{account.id}</p>
                    <p className="text-xs text-slate-200/80">
                      Currency: {account.currency} · Owner: {account.owner}
                    </p>
                    <p className="text-xs text-slate-200/60">
                      Created: {new Date(account.created_at).toLocaleString("en-IL", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Jerusalem",
                      })}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: account.currency || "USD",
                    }).format(account.balance)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-slate-200/80">
              No accounts found yet. Create one to see your balance.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
