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
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_35%)]" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8 py-10 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-right">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold border border-white/20 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
              {ownerName ? `שלום, ${ownerName}` : "ברוכים הבאים"}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">הדשבורד שלכם</h1>
            <p className="text-purple-100/80 text-sm md:text-base">
              מעקב חי אחר יתרות, חשבונות והעברות בבנק השחר.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={() => router.push("/transfers")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-rose-600 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:scale-[1.01]"
            >
              העברה חדשה
            </button>
            <button
              onClick={() => router.push("/accounts")}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-white/10"
            >
              ניהול חשבונות
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-white/10"
            >
              יציאה
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-purple-950/30 text-right backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-purple-100/75">יתרה כוללת</p>
              {totalBalance ? (
                <p className="text-3xl font-semibold text-white">
                  {new Intl.NumberFormat("he-IL", {
                    style: "currency",
                    currency: totalBalance.currency,
                  }).format(totalBalance.amount)}
                </p>
              ) : (
                <p className="text-2xl font-semibold text-white">
                  {loading ? "טוען..." : "אין חשבונות עדיין"}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-purple-100/80 justify-end">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                סנכרון עכשיו
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {accounts.length} חשבון{accounts.length === 1 ? "" : "ות"}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-purple-950/30 text-right backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">חשבונות</h2>
            <button
              onClick={() => router.push("/accounts")}
              className="text-sm font-semibold text-amber-200 hover:text-amber-100"
            >
              צפייה בכל החשבונות
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
                <div key={item} className="h-16 animate-pulse rounded-2xl bg-white/10" />
              ))}
            </div>
          ) : accounts.length ? (
            <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">חשבון #{account.id}</p>
                    <p className="text-xs text-purple-100/80">
                      מטבע: {account.currency} · בעלים: {account.owner}
                    </p>
                    <p className="text-xs text-purple-100/70">
                      נוצר:{" "}
                      {new Date(account.created_at).toLocaleString("he-IL", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Jerusalem",
                      })}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {new Intl.NumberFormat("he-IL", {
                      style: "currency",
                      currency: account.currency || "USD",
                    }).format(account.balance)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-purple-100/80">
              אין חשבונות עדיין. פתחו חשבון חדש כדי לראות יתרות.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
