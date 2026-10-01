"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { resetPasswordSchema, type ResetPasswordFormValues } from "@/features/auth/schemas/auth.schemas";

export const useResetPasswordForm = () =>
  useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmation: "" },
    mode: "onTouched",
  });