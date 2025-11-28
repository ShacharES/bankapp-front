"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/api/auth";

type LoginPayload = {
  username: string;
  password: string;
};

//const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!loginPayload.username) {
      setError("Username is required.");
      return;
    }

    if (loginPayload.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginPayload);
      setSuccess(true);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/30"
    >
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-tr from-slate-900/80 via-slate-800/70 to-slate-700/60 blur-3xl" />

      <div className="relative space-y-2">
        <p className="text-sm font-medium text-teal-100/80">Sign in</p>
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
        <p className="text-sm text-slate-200/70">
          Securely access your account to manage balances, cards, and transfers.
        </p>
      </div>

      <div className="relative mt-8 space-y-4">
        <label className="block space-y-2 text-sm font-medium text-slate-100">
          <span>Username</span>
          <input
            type="text"
            autoComplete="username"
            value={loginPayload.username}
            onChange={(event) =>
              setLoginPayload((prev) => ({ ...prev, username: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
            placeholder="your username"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-100">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={loginPayload.password}
            onChange={(event) =>
              setLoginPayload((prev) => ({ ...prev, password: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
            placeholder="••••••••"
          />
        </label>
      </div>

      {error && (
        <p className="relative mt-4 text-sm font-medium text-rose-200">
          {error}
        </p>
      )}

      {success && (
        <p className="relative mt-4 text-sm font-medium text-emerald-200">
          You&apos;re in! We&apos;ll redirect you to your dashboard shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-900/40 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-teal-900/50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign in securely"}
      </button>
    </form>
  );
}
