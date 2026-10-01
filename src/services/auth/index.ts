export { authApiMock } from "./api.mock";
export { AuthApiError } from "./errors";
export type {
  AuthApiErrorCode,
  AuthUser,
  LoginCredentials,
  LoginResponse,
  OtpVerification,
  OtpVerificationResult,
  PasswordResetChallenge,
  PasswordResetCompletion,
  PasswordResetRequest,
} from "./types";

import { authApiMock, MOCK_LOGIN_CREDENTIALS, MOCK_OTP_CODE } from "./api.mock";

export const authApi = authApiMock;

export interface AuthDemoHints {
  identifier: string;
  password: string;
  otpCode: string;
}

/** Indices affichés uniquement avec l'API mockée : passer à `null` avec la vraie API. */
export const authDemoHints: AuthDemoHints | null = {
  identifier: MOCK_LOGIN_CREDENTIALS.identifier,
  password: MOCK_LOGIN_CREDENTIALS.password,
  otpCode: MOCK_OTP_CODE,
};