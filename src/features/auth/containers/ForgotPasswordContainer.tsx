"use client";

import { useRouter } from "next/navigation";

import { ForgotPasswordFormView } from "@/features/auth/components/ForgotPasswordFormView";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { useForgotPasswordForm } from "@/features/auth/hooks/useForgotPasswordForm";
import { authRoutes } from "@/features/auth/lib/auth-routes";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";

export const ForgotPasswordContainer = () => {
  const router = useRouter();
  const form = useForgotPasswordForm();
  const mutation = useForgotPassword();
  const onSubmit = form.handleSubmit((values) => mutation.mutate(values, {
    onSuccess: ({ challengeId }) => router.push(authRoutes.verifyOtp(challengeId)),
  }));

  return (
    <ForgotPasswordFormView
      email={form.register("email")}
      error={form.formState.errors.email?.message}
      errorMessage={mutation.error ? getAuthErrorMessage(mutation.error) : undefined}
      isPending={mutation.isPending}
      isSubmitDisabled={!form.formState.isValid || mutation.isPending}
      onSubmit={onSubmit}
    />
  );
};