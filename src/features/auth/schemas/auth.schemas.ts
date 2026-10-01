import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Veuillez saisir votre identifiant."),
  password: z.string().min(1, "Veuillez saisir votre mot de passe."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Veuillez saisir une adresse email valide."),
});

export const otpSchema = z.object({
  code: z.string().regex(/^\d{4}$/, "Veuillez saisir les quatre chiffres du code."),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    confirmation: z.string().min(1, "Veuillez confirmer votre mot de passe."),
  })
  .refine((values) => values.password === values.confirmation, {
    path: ["confirmation"],
    message: "Les mots de passe ne correspondent pas.",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;