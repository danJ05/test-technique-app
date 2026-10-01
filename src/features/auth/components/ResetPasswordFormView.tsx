import type { FormEventHandler } from "react";
import Link from "next/link";

import { AuthCard } from "./AuthCard";
import { Button } from "@/shared/ui/Button";
import { FormField, getFieldErrorId } from "@/shared/ui/FormField";
import type { InputProps } from "@/shared/ui/Input";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { routes } from "@/shared/config/routes";

import { AuthNotice } from "./AuthNotice";

interface ResetPasswordFormViewProps {
  resetToken: string;
  password: Pick<InputProps, "name" | "onBlur" | "onChange" | "ref">;
  confirmation: Pick<InputProps, "name" | "onBlur" | "onChange" | "ref">;
  errors: { password?: string; confirmation?: string };
  errorMessage?: string;
  isPending: boolean;
  isSubmitDisabled: boolean;
  isSuccess: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ResetPasswordFormView = ({
  resetToken,
  password,
  confirmation,
  errors,
  errorMessage,
  isPending,
  isSubmitDisabled,
  isSuccess,
  onSubmit,
}: ResetPasswordFormViewProps) => (
  <AuthCard compact title="Nouveau mot de passe" description="Définis ton nouveau mot de passe pour terminer">
    {!resetToken ? (
      <div className="flex flex-1 flex-col gap-4">
        <AuthNotice>Cette demande est absente ou expirée. Recommencez la procédure.</AuthNotice>
        <Link href={routes.forgotPassword} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Demander un nouveau code
        </Link>
      </div>
    ) : isSuccess ? (
      <div className="flex flex-1 flex-col gap-4">
        <AuthNotice tone="success">Mot de passe mis à jour (simulation). Aucune donnée n’a été conservée.</AuthNotice>
        <Link href={routes.login} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Retour à la connexion
        </Link>
      </div>
    ) : (
      <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="space-y-4">
          <FormField id="new-password" label="Nouveau mot de passe" error={errors.password}>
            <PasswordInput
              id="new-password"
              {...password}
              autoComplete="new-password"
              minLength={8}
              hasError={Boolean(errors.password)}
              aria-describedby={errors.password ? getFieldErrorId("new-password") : undefined}
              required
            />
          </FormField>
          <FormField id="confirm-password" label="Confirmer le mot de passe" error={errors.confirmation}>
            <PasswordInput
              id="confirm-password"
              {...confirmation}
              autoComplete="new-password"
              minLength={8}
              hasError={Boolean(errors.confirmation)}
              aria-describedby={errors.confirmation ? getFieldErrorId("confirm-password") : undefined}
              required
            />
          </FormField>
        </div>
        {errorMessage && <AuthNotice>{errorMessage}</AuthNotice>}
        <Button type="submit" size="auth" className="mt-auto h-11 max-w-65 self-center text-sm" disabled={isSubmitDisabled} isLoading={isPending}>
          Valider
        </Button>
      </form>
    )}
  </AuthCard>
);