import { LoginForm } from "@/components/forms/login-form";
import { HeroSection } from "@/components/layout/hero-section";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.1),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(52,211,153,0.08),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-14 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-18">
        <HeroSection />

        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
