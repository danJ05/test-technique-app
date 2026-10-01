"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/auth/schemas/auth.schemas";

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });