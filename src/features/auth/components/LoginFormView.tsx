import type { FormEventHandler } from "react";
import Link from "next/link";

import { AuthCard } from "./AuthCard";
import { Button } from "@/shared/ui/Button";
import { FormField, getFieldErrorId } from "@/shared/ui/FormField";
import { Input, type InputProps } from "@/shared/ui/Input";
import { PasswordInput } from "@/shared/ui/PasswordInput";
import { routes } from "@/shared/config/routes";

import { AuthNotice } from "./AuthNotice";

interface LoginFormViewProps {
  identifier: Pick<InputProps, "name" | "onBlur" | "onChange" | "ref">;
  password: Pick<InputProps, "name" | "onBlur" | "onChange" | "ref">;
  errors: { identifier?: string; password?: string };
  isPending: boolean;
  isSubmitDisabled: boolean;
  errorMessage?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const LoginFormView = ({
  identifier,
  password,
  errors,
  isPending,
  isSubmitDisabled,
  errorMessage,
  onSubmit,
}: LoginFormViewProps) => (
  <AuthCard compact title="Connexion" description="Saisissez vos identifiants pour vous connecter">
    <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
      <div className="space-y-4">
        <FormField id="identifier" label="Identifiant" error={errors.identifier}>
          <Input
            id="identifier"
            {...identifier}
            autoComplete="username"
            hasError={Boolean(errors.identifier)}
            aria-describedby={errors.identifier ? getFieldErrorId("identifier") : undefined}
            required
          />
        </FormField>
        <FormField id="password" label="Mot de passe" error={errors.password}>
          <PasswordInput
            id="password"
            {...password}
            autoComplete="current-password"
            hasError={Boolean(errors.password)}
            aria-describedby={errors.password ? getFieldErrorId("password") : undefined}
            required
          />
        </FormField>
      </div>
      <div className="mt-3 text-right">
        <Link href={routes.forgotPassword} className="text-xs font-medium text-primary underline-offset-4 hover:underline">
          Mot de passe oublié
        </Link>
      </div>
      {errorMessage && <AuthNotice>{errorMessage}</AuthNotice>}
      <Button type="submit" size="auth" className="mt-auto h-11 max-w-65 self-center text-sm" disabled={isSubmitDisabled} isLoading={isPending}>
        Se connecter
      </Button>
    </form>
  </AuthCard>
);