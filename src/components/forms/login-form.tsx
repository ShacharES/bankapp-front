"use client";

import { FormEvent, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { login } from "@/lib/api/auth";
import { AuthFormFallback, AuthFormShell } from "@/components/forms/auth-form-shell";

type LoginPayload = {
  username: string;
  password: string;
};

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <AuthFormFallback />
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}

function LoginFormInner() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectParam = searchParams.get("redirect");
  const redirectPath = redirectParam ?? "/dashboard";
  const registerTarget = redirectParam
    ? `/register?redirect=${encodeURIComponent(redirectParam)}`
    : "/register";

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
      router.push(redirectPath);
    } catch (err) {
      const message =
        err instanceof Error
          ? `Login failed (${err.message})`
          : "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell
      onSubmit={handleSubmit}
      eyebrow="Sign in"
      title="Welcome back"
      description="Securely access your account to manage balances, cards, and transfers."
      fields={
        <>
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
        </>
      }
    >
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

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-900/40 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-teal-900/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        <button
          type="button"
        onClick={() => router.push(registerTarget)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
      >
        Don't have an account? &nbsp;—&nbsp;Register
      </button>
      </div>
    </AuthFormShell>
  );
}
