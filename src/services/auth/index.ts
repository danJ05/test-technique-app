export { authApiMock, MOCK_LOGIN_CREDENTIALS, MOCK_OTP_CODE } from "./api.mock";
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

import { authApiMock } from "./api.mock";

export const authApi = authApiMock;