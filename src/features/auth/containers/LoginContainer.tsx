"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoginFormView } from "@/features/auth/components/LoginFormView";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";
import { createDemoSession } from "@/features/auth/lib/auth-session";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { routes } from "@/shared/config/routes";

export const LoginContainer = () => {
  const router = useRouter();
  const form = useLoginForm();
  const mutation = useLogin();
  // Le Toaster est global (AppProviders) : le message reste visible après la redirection.
  const onSubmit = form.handleSubmit((values) => mutation.mutate(values, {
    onSuccess: ({ user }) => {
      createDemoSession();
      toast.success(`Bienvenue, ${user.displayName}`);
      router.replace(routes.dashboard);
    },
  }));
  const isBusy = mutation.isPending || mutation.isSuccess;

  return (
    <LoginFormView
      identifier={form.register("identifier")}
      password={form.register("password")}
      errors={{ identifier: form.formState.errors.identifier?.message, password: form.formState.errors.password?.message }}
      isPending={isBusy}
      isSubmitDisabled={isBusy}
      errorMessage={mutation.error ? getAuthErrorMessage(mutation.error) : undefined}
      onSubmit={onSubmit}
    />
  );
};
