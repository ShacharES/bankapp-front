"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { login, register } from "@/lib/api/auth";
import { AuthFormFallback, AuthFormShell } from "@/components/forms/auth-form-shell";

type RegisterPayload = {
  username: string;
  password: string;
  full_name: string;
  email: string;
};

export function RegisterForm() {
  return (
    <Suspense
      fallback={
        <AuthFormFallback />
      }
    >
      <RegisterFormInner />
    </Suspense>
  );
}

function RegisterFormInner() {
  const [registerPayload, setRegisterPayload] = useState<RegisterPayload>({
    username: "",
    password: "",
    full_name: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") ?? "/dashboard";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!registerPayload.username) {
      setError("Username is required.");
      return;
    }

    if (!registerPayload.email) {
      setError("Email is required.");
      return;
    }

    if (registerPayload.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!registerPayload.full_name) {
      setError("Full name is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(registerPayload.email)) {
      setError("Email format is invalid.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(registerPayload);
      await login(registerPayload);
      setSuccess(true);
      router.push(redirectPath);
    } catch (err) {
      const message =
        err instanceof Error
          ? `Registration failed (${err.message})`
          : "Unable to sign up. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToLogin = () => {
    const redirect = searchParams.get("redirect");
    const loginTarget = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login";
    router.push(loginTarget);
  };

  return (
    <AuthFormShell
      onSubmit={handleSubmit}
      eyebrow="Sign up"
      title="Create your account"
      description="Join Bankapp to access your dashboard, manage balances, cards, and transfers."
      fields={
        <>
          <label className="block space-y-2 text-sm font-medium text-slate-100">
            <span>Username</span>
            <input
              type="text"
              autoComplete="username"
              value={registerPayload.username}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, username: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
              placeholder="choose a username"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={registerPayload.email}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
              placeholder="your email address"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100">
            <span>Full Name</span>
            <input
              type="text"
              autoComplete="full-name"
              value={registerPayload.full_name}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, full_name: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
              placeholder="full name"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100">
            <span>Password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={registerPayload.password}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-teal-300/70 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
              placeholder="create a password"
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
          Account created! We'll redirect you to your dashboard shortly.
        </p>
      )}

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-900/40 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-teal-900/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing you up..." : "Sign up"}
        </button>
        <button
          type="button"
          onClick={goToLogin}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          Already have an account? Log in
        </button>
      </div>
    </AuthFormShell>
  );
}
