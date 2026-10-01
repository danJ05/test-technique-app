"use client";

import { useRouter } from "next/navigation";

import { ForgotPasswordFormView } from "@/features/auth/components/ForgotPasswordFormView";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { useForgotPasswordForm } from "@/features/auth/hooks/useForgotPasswordForm";
import { routes } from "@/shared/config/routes";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";

export const ForgotPasswordContainer = () => {
  const router = useRouter();
  const form = useForgotPasswordForm();
  const mutation = useForgotPassword();
  const onSubmit = form.handleSubmit((values) => mutation.mutate(values, {
    onSuccess: ({ challengeId }) => router.push(routes.verifyOtp(challengeId)),
  }));

  return (
    <ForgotPasswordFormView
      email={form.register("email")}
      error={form.formState.errors.email?.message}
      errorMessage={mutation.error ? getAuthErrorMessage(mutation.error) : undefined}
      isPending={mutation.isPending}
      isSubmitDisabled={mutation.isPending}
      onSubmit={onSubmit}
    />
  );
};