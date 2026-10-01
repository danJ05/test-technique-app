import type { Metadata } from "next";

import { ForgotPasswordContainer } from "@/features/auth";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}