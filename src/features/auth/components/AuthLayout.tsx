import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { BirdIllustration } from "@/shared/components/brand/BirdIllustration";

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4 py-8 sm:px-8">
    <BirdIllustration
      priority
      className="absolute -bottom-35 left-1/2 z-0 h-auto w-300 max-w-none -translate-x-1/2 max-sm:-bottom-45 max-sm:w-237.5"
    />
    <div className="relative z-10 flex w-full justify-center">{children}</div>
    <Toaster position="top-center" richColors />
  </main>
);