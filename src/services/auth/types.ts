export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: string;
  identifier: string;
  displayName: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetChallenge {
  challengeId: string;
}

export interface OtpVerification {
  challengeId: string;
  code: string;
}

export interface OtpVerificationResult {
  resetToken: string;
}

export interface PasswordResetCompletion {
  resetToken: string;
  password: string;
}

export type AuthApiErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_NOT_FOUND"
  | "INVALID_OTP"
  | "INVALID_RESET_TOKEN"
  | "TOO_MANY_ATTEMPTS"
  | "NETWORK_ERROR"
  | "SERVER_ERROR";