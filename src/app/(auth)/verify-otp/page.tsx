import type { Metadata } from "next";

import { OtpContainer } from "@/features/auth";

export const metadata: Metadata = { title: "Code OTP" };

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ challenge?: string | string[] }>;
}) {
  const params = await searchParams;
  const challengeId = typeof params.challenge === "string" ? params.challenge : "";

  return <OtpContainer challengeId={challengeId} />;
}