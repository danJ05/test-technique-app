"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoginFormView } from "@/features/auth/components/LoginFormView";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";
import { authRoutes } from "@/features/auth/lib/auth-routes";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { MOCK_LOGIN_CREDENTIALS } from "@/services/auth";

export const LoginContainer = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const form = useLoginForm();
  const mutation = useLogin();
  const onSubmit = form.handleSubmit((values) => mutation.mutate(values, {
    onSuccess: ({ user }) => {
      setIsRedirecting(true);
      toast.success(`Bienvenue, ${user.displayName}`, { duration: 3000 });
      window.setTimeout(() => router.replace(authRoutes.dashboard), 3000);
    },
  }));

  return (
    <LoginFormView
      identifier={form.register("identifier")}
      password={form.register("password")}
      demoIdentifier={MOCK_LOGIN_CREDENTIALS.identifier}
      demoPassword={MOCK_LOGIN_CREDENTIALS.password}
      errors={{ identifier: form.formState.errors.identifier?.message, password: form.formState.errors.password?.message }}
      isPending={mutation.isPending || isRedirecting}
      isSubmitDisabled={!form.formState.isValid || mutation.isPending || isRedirecting}
      errorMessage={mutation.error ? getAuthErrorMessage(mutation.error) : undefined}
      onSubmit={onSubmit}
    />
  );
};