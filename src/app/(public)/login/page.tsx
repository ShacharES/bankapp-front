import { Suspense } from "react";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-14">
      <div className="w-full max-w-md">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
