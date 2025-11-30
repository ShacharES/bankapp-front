import React from "react";
import Navbar from "@/components/layout/navbar";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-rose-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.06),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.04),_transparent_25%)]" />
      <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-rose-400/25 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />

      <Navbar />

      <main className="container mx-auto px-4 relative z-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-right">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold border border-white/20 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
              פתיחת חשבון דיגיטלית תוך דקות
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              בוקר חדש. חשבון חדש.
              <br />
              כל מה שאתם צריכים בבנק השחר.
            </h1>
            <p className="text-lg text-purple-100/85 max-w-2xl ms-auto">
              הירשמו בקלות, קבלו גישה לעו״ש, כרטיסים והלוואות, ונהנו משירות דיגיטלי שמרגיש אישי.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                <p className="text-base font-semibold text-white mb-1">שיחה עם בנקאי דיגיטלי</p>
                <p className="text-sm text-purple-100/80">נלווה אתכם בתהליך הפתיחה.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                <p className="text-base font-semibold text-white mb-1">שקיפות מלאה</p>
                <p className="text-sm text-purple-100/80">עמלות ברורות והודעות בזמן אמת.</p>
              </div>
            </div>
          </div>

          <div className="max-w-lg w-full mx-auto">
            <div className="mb-4 text-right">
              <p className="text-sm text-purple-100/80">הצטרפות דיגיטלית</p>
              <p className="text-base font-semibold text-white">בנק השחר • פתיחת חשבון</p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
  );
}
