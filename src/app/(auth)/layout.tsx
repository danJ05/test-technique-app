import type { ReactNode } from "react";

import { AuthLayout } from "@/features/auth";

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}