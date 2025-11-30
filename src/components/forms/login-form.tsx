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
      setError("יש להזין שם משתמש.");
      return;
    }

    if (loginPayload.password.length < 6) {
      setError("סיסמה חייבת להכיל לפחות 6 תווים.");
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
          ? `התחברות נכשלה (${err.message})`
          : "לא הצלחנו להתחבר. נסו שוב.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormShell
      onSubmit={handleSubmit}
      eyebrow="כניסה לחשבון"
      title="ברוכים השבים לבנק השחר"
      description="התחברו בקלות כדי לנהל יתרות, כרטיסים והעברות במקום אחד."
      fields={
        <>
          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>שם משתמש</span>
            <input
              type="text"
              autoComplete="username"
              value={loginPayload.username}
              onChange={(event) =>
                setLoginPayload((prev) => ({ ...prev, username: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="הקלידו שם משתמש"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>סיסמה</span>
            <input
              type="password"
              autoComplete="current-password"
              value={loginPayload.password}
              onChange={(event) =>
                setLoginPayload((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="••••••••"
            />
          </label>
        </>
      }
    >
      {error && (
        <p className="relative mt-4 text-sm font-medium text-rose-200 text-right">{error}</p>
      )}

      {success && (
        <p className="relative mt-4 text-sm font-medium text-emerald-200 text-right">
          התחברתם בהצלחה! מיד תעברו לחשבון שלכם.
        </p>
      )}

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 via-rose-600 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-900/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "מתחברים..." : "כניסה לחשבון"}
        </button>
        <button
          type="button"
        onClick={() => router.push(registerTarget)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
      >
        עדיין אין לכם חשבון? &nbsp;—&nbsp;להרשמה
      </button>
      </div>
    </AuthFormShell>
  );
}
