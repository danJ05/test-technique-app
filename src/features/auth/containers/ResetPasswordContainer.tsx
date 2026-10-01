"use client";

import { ResetPasswordFormView } from "@/features/auth/components/ResetPasswordFormView";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { useResetPasswordForm } from "@/features/auth/hooks/useResetPasswordForm";

export const ResetPasswordContainer = ({ resetToken }: { resetToken: string }) => {
  const form = useResetPasswordForm();
  const mutation = useResetPassword();
  const onSubmit = form.handleSubmit(({ password }) => mutation.mutate({ resetToken, password }));

  return (
    <ResetPasswordFormView
      resetToken={resetToken}
      password={form.register("password")}
      confirmation={form.register("confirmation")}
      errors={{ password: form.formState.errors.password?.message, confirmation: form.formState.errors.confirmation?.message }}
      errorMessage={mutation.error ? getAuthErrorMessage(mutation.error) : undefined}
      isPending={mutation.isPending}
      isSubmitDisabled={mutation.isPending}
      isSuccess={mutation.isSuccess}
      onSubmit={onSubmit}
    />
  );
};