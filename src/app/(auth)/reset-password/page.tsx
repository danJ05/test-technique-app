import type { Metadata } from "next";

import { ResetPasswordContainer } from "@/features/auth";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const resetToken = typeof params.token === "string" ? params.token : "";

  return <ResetPasswordContainer resetToken={resetToken} />;
}