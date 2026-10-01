import type { ClipboardEvent, FormEventHandler, KeyboardEvent } from "react";
import Link from "next/link";

import { AuthCard } from "@/shared/components/AuthCard";
import { Button } from "@/shared/ui/Button";

import { AuthNotice } from "./AuthNotice";

interface OtpFormViewProps {
  challengeId: string;
  digits: string[];
  demoCode: string;
  errorMessage?: string;
  remainingSeconds: number;
  isSubmitDisabled: boolean;
  isPending: boolean;
  isResendPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDigitChange: (index: number, value: string) => void;
  onDigitKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onInputRef: (index: number, element: HTMLInputElement | null) => void;
  onResend: () => void;
}

export const OtpFormView = ({
  challengeId,
  digits,
  demoCode,
  errorMessage,
  remainingSeconds,
  isSubmitDisabled,
  isPending,
  isResendPending,
  onSubmit,
  onDigitChange,
  onDigitKeyDown,
  onPaste,
  onInputRef,
  onResend,
}: OtpFormViewProps) => {
  const formattedTime = `00:${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <AuthCard compact title="Code OTP" description="Veuillez saisir le code OTP reçu par message sur votre adresse email">
      {!challengeId ? (
        <div className="flex flex-1 flex-col gap-4">
          <AuthNotice>Cette demande est absente ou expirée. Recommencez la procédure.</AuthNotice>
          <Link href="/forgot-password" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Demander un nouveau code
          </Link>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col">
          <fieldset aria-describedby={errorMessage ? "otp-error" : undefined} className="m-0 border-0 p-0">
            <legend className="sr-only">Code de vérification à quatre chiffres</legend>
            <div className="flex gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => onInputRef(index, element)}
                  aria-label={`Chiffre ${index + 1} sur 4`}
                  aria-invalid={Boolean(errorMessage) || undefined}
                  aria-describedby={errorMessage ? "otp-error" : undefined}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  inputMode="numeric"
                  maxLength={1}
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(event) => onDigitChange(index, event.target.value)}
                  onKeyDown={(event) => onDigitKeyDown(index, event)}
                  onPaste={onPaste}
                  className="size-10 rounded-button border border-border bg-white text-center text-sm font-bold text-ink focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary"
                />
              ))}
            </div>
          </fieldset>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-ink">Pas encore reçu ? {formattedTime}</span>
            <button
              type="button"
              disabled={remainingSeconds > 0 || isResendPending}
              onClick={onResend}
              className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:text-muted-foreground disabled:no-underline"
            >
              Renvoyer
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Code de démonstration : {demoCode}</p>
          {errorMessage && <p id="otp-error" role="alert" className="mt-2 text-xs text-primary">{errorMessage}</p>}
          <Button type="submit" size="auth" className="mt-auto h-11 max-w-65 self-center text-sm" disabled={isSubmitDisabled} isLoading={isPending}>
            Valider
          </Button>
        </form>
      )}
    </AuthCard>
  );
};