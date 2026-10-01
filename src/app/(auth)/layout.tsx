import type { ReactNode } from "react";

import { AuthLayout } from "@/features/auth";

import { AuthProviders } from "./providers";

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProviders>
      <AuthLayout>{children}</AuthLayout>
    </AuthProviders>
  );
}