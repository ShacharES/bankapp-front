import { Suspense } from "react";

import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-14">
      <div className="w-full max-w-md">
        <Suspense fallback={null}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
