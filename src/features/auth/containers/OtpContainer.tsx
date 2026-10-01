"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { OtpFormView } from "@/features/auth/components/OtpFormView";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useOtpForm } from "@/features/auth/hooks/useOtpForm";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import { authRoutes } from "@/features/auth/lib/auth-routes";
import { getAuthErrorMessage } from "@/features/auth/lib/auth-errors";
import { MOCK_OTP_CODE } from "@/services/auth";

export const OtpContainer = ({ challengeId }: { challengeId: string }) => {
  const [resendTimerKey, setResendTimerKey] = useState(0);
  const router = useRouter();
  const otp = useOtpForm();
  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();
  const onSubmit = otp.form.handleSubmit(({ code }) => verifyMutation.mutate({ challengeId, code }, {
    onSuccess: ({ resetToken }) => router.push(authRoutes.resetPassword(resetToken)),
  }));
  const onResend = () => resendMutation.mutate(challengeId, {
    onSuccess: () => {
      setResendTimerKey((key) => key + 1);
      toast.success("Un nouveau code a été envoyé.");
    },
  });
  const validationError = otp.form.formState.errors.code?.message;
  const errorMessage = validationError
    || (verifyMutation.error ? getAuthErrorMessage(verifyMutation.error) : undefined)
    || (resendMutation.error ? getAuthErrorMessage(resendMutation.error) : undefined);

  return (
    <OtpFormView
      challengeId={challengeId}
      digits={otp.digits}
      demoCode={MOCK_OTP_CODE}
      errorMessage={errorMessage}
      resendTimerKey={resendTimerKey}
      isSubmitDisabled={!otp.form.formState.isValid || verifyMutation.isPending}
      isPending={verifyMutation.isPending}
      isResendPending={resendMutation.isPending}
      onSubmit={onSubmit}
      onDigitChange={otp.onDigitChange}
      onDigitKeyDown={otp.onDigitKeyDown}
      onPaste={otp.onPaste}
      onInputRef={otp.onInputRef}
      onResend={onResend}
    />
  );
};