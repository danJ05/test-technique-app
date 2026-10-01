import type { FormEventHandler } from "react";
import Link from "next/link";

import { AuthCard } from "@/shared/components/AuthCard";
import { Button } from "@/shared/ui/Button";
import { FormField, getFieldErrorId } from "@/shared/ui/FormField";
import { Input, type InputProps } from "@/shared/ui/Input";
import { authRoutes } from "@/features/auth/lib/auth-routes";

import { AuthNotice } from "./AuthNotice";

interface ForgotPasswordFormViewProps {
  email: Pick<InputProps, "name" | "onBlur" | "onChange" | "ref">;
  error?: string;
  errorMessage?: string;
  isPending: boolean;
  isSubmitDisabled: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ForgotPasswordFormView = ({ email, error, errorMessage, isPending, isSubmitDisabled, onSubmit }: ForgotPasswordFormViewProps) => (
  <AuthCard compact title="Mot de passe oublié" description="Veuillez entrer votre adresse email pour réinitialiser votre mot de passe">
    <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
      <FormField id="email" label="Email" error={error}>
        <Input
          id="email"
          {...email}
          type="email"
          autoComplete="email"
          inputMode="email"
          hasError={Boolean(error)}
          aria-describedby={error ? getFieldErrorId("email") : undefined}
          required
        />
      </FormField>
      {errorMessage && <AuthNotice>{errorMessage}</AuthNotice>}
      <Link href={authRoutes.login} className="mt-4 self-end text-xs font-medium text-primary underline-offset-4 hover:underline">
        Retour à la connexion
      </Link>
      <Button type="submit" size="auth" className="mt-auto h-11 max-w-65 self-center text-sm" disabled={isSubmitDisabled} isLoading={isPending}>
        Continuer
      </Button>
    </form>
  </AuthCard>
);