import type { Metadata } from "next";

import { LoginContainer } from "@/features/auth";

export const metadata: Metadata = { title: "Connexion" };

export default function LoginPage() {
  return <LoginContainer />;
}