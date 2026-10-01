import { AuthApiError, type AuthApiErrorCode } from "@/services/auth";

const messages: Record<AuthApiErrorCode, string> = {
  INVALID_CREDENTIALS: "Identifiant ou mot de passe invalide.",
  EMAIL_NOT_FOUND: "Aucun compte ne correspond à cette adresse email.",
  INVALID_OTP: "Le code saisi est invalide ou expiré.",
  INVALID_RESET_TOKEN: "Ce lien n’est plus valide. Recommencez la procédure.",
  TOO_MANY_ATTEMPTS: "Trop de tentatives. Veuillez réessayer plus tard.",
  NETWORK_ERROR: "Connexion impossible. Vérifiez votre réseau puis réessayez.",
  SERVER_ERROR: "Une erreur est survenue. Veuillez réessayer.",
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof AuthApiError) return messages[error.code];
  return messages.SERVER_ERROR;
};