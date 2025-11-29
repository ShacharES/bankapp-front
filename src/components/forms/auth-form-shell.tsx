"use client";

import { ComponentProps, ReactNode } from "react";

type AuthFormShellProps = Omit<ComponentProps<"form">, "children"> & {
  eyebrow: string;
  title: string;
  description: string;
  fields: ReactNode;
  children?: ReactNode;
};

export function AuthFormShell({
  eyebrow,
  title,
  description,
  fields,
  className,
  children,
  ...formProps
}: AuthFormShellProps) {
  const baseClassName =
    "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/30";

  return (
    <form {...formProps} className={className ? `${baseClassName} ${className}` : baseClassName}>
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-400/40 via-teal-400/30 to-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-tr from-slate-900/80 via-slate-800/70 to-slate-700/60 blur-3xl" />

      <div className="relative space-y-2">
        <p className="text-sm font-medium text-teal-100/80">{eyebrow}</p>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-200/70">{description}</p>
      </div>

      <div className="relative mt-8 space-y-4">{fields}</div>

      {children}
    </form>
  );
}

export function AuthFormFallback() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/30">
      <div className="mb-4 h-6 w-32 rounded-full bg-white/10" />
      <div className="mb-3 h-10 w-full rounded-2xl bg-white/10" />
      <div className="mb-3 h-10 w-full rounded-2xl bg-white/10" />
      <div className="h-10 w-full rounded-2xl bg-white/10" />
    </div>
  );
}
