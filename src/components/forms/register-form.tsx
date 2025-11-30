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
      setError("יש להזין שם משתמש.");
      return;
    }

    if (!registerPayload.email) {
      setError("יש להזין אימייל.");
      return;
    }

    if (registerPayload.password.length < 6) {
      setError("סיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }

    if (!registerPayload.full_name) {
      setError("יש להזין שם מלא.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(registerPayload.email)) {
      setError("כתובת האימייל אינה תקינה.");
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
          ? `ההרשמה נכשלה (${err.message})`
          : "לא הצלחנו להשלים הרשמה. נסו שוב.";
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
      eyebrow="פתיחת חשבון"
      title="ברוכים הבאים לבנק השחר"
      description="הצטרפו לדיגיטל של בנק השחר כדי לנהל עו״ש, הלוואות והעברות במקום אחד."
      fields={
        <>
          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>שם משתמש</span>
            <input
              type="text"
              autoComplete="username"
              value={registerPayload.username}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, username: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="בחרו שם משתמש"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>אימייל</span>
            <input
              type="email"
              autoComplete="email"
              value={registerPayload.email}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="הקלידו אימייל"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>שם מלא</span>
            <input
              type="text"
              autoComplete="full-name"
              value={registerPayload.full_name}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, full_name: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="הקלידו שם מלא"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-100 text-right">
            <span>סיסמה</span>
            <input
              type="password"
              autoComplete="new-password"
              value={registerPayload.password}
              onChange={(event) =>
                setRegisterPayload((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-200/60 shadow-inner shadow-slate-900/20 outline-none transition focus:border-purple-200/80 focus:bg-white/15 focus:ring-2 focus:ring-rose-300/40"
              placeholder="צרו סיסמה"
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
          החשבון נוצר! מעבירים אתכם ללוח הבקרה.
        </p>
      )}

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 via-rose-600 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-900/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "נרשמים..." : "פתיחת חשבון"}
        </button>
        <button
          type="button"
          onClick={goToLogin}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          כבר יש לכם חשבון? התחברות
        </button>
      </div>
    </AuthFormShell>
  );
}
