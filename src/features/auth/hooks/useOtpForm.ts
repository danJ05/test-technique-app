"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { otpSchema, type OtpFormValues } from "@/features/auth/schemas/auth.schemas";

const OTP_LENGTH = 4;
const RESEND_DELAY_SECONDS = 30;

export const useOtpForm = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(RESEND_DELAY_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });
  const code = useWatch({ control: form.control, name: "code" });
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => code[index] ?? "");

  useEffect(() => {
    if (remainingSeconds === 0) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remainingSeconds]);

  const setPastedCode = (value: string) => {
    const pastedDigits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    form.setValue("code", pastedDigits, { shouldDirty: true, shouldValidate: true });
    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH - 1)]?.focus();
  };

  const onDigitChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length > 1) {
      setPastedCode(numericValue);
      return;
    }

    const nextDigits = digits.map((digit, currentIndex) => currentIndex === index ? numericValue : digit);
    form.setValue("code", nextDigits.join(""), { shouldDirty: true, shouldValidate: true });
    if (numericValue && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const onDigitKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPastedCode(event.clipboardData.getData("text"));
  };

  const setInputRef = (index: number, element: HTMLInputElement | null) => {
    inputRefs.current[index] = element;
  };

  return {
    form,
    digits,
    onDigitChange,
    onDigitKeyDown,
    onPaste,
    onInputRef: setInputRef,
    remainingSeconds,
    restartResendTimer: () => setRemainingSeconds(RESEND_DELAY_SECONDS),
  };
};