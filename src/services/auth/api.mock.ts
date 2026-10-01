import type {
  LoginCredentials,
  LoginResponse,
  OtpVerification,
  OtpVerificationResult,
  PasswordResetChallenge,
  PasswordResetCompletion,
  PasswordResetRequest,
} from "./types";
import { AuthApiError } from "./errors";

export const MOCK_OTP_CODE = "1234";
export const MOCK_LOGIN_CREDENTIALS: LoginCredentials = {
  identifier: "demo",
  password: "Demo1234!",
};

const mockChallengeId = "demo-challenge";
const mockResetToken = "demo-reset-token";

const waitForMockResponse = () => new Promise<void>((resolve) => setTimeout(resolve, 350));

export const authApiMock = {
  login: async ({ identifier, password }: LoginCredentials): Promise<LoginResponse> => {
    await waitForMockResponse();
    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (normalizedIdentifier === "serveur") throw new AuthApiError("SERVER_ERROR");
    if (normalizedIdentifier === "réseau") throw new AuthApiError("NETWORK_ERROR");
    if (
      normalizedIdentifier !== MOCK_LOGIN_CREDENTIALS.identifier
      || password !== MOCK_LOGIN_CREDENTIALS.password
    ) {
      throw new AuthApiError("INVALID_CREDENTIALS");
    }

    return {
      user: {
        id: "demo-user",
        identifier: MOCK_LOGIN_CREDENTIALS.identifier,
        displayName: "Utilisateur démo",
      },
    };
  },

  forgotPassword: async ({ email }: PasswordResetRequest): Promise<PasswordResetChallenge> => {
    await waitForMockResponse();

    if (!email.trim()) throw new AuthApiError("EMAIL_NOT_FOUND");
    if (email.trim().toLowerCase() === "serveur@example.test") throw new AuthApiError("SERVER_ERROR");
    return { challengeId: mockChallengeId };
  },

  resendOtp: async (challengeId: string): Promise<void> => {
    await waitForMockResponse();

    if (challengeId !== mockChallengeId) throw new AuthApiError("INVALID_OTP");
  },

  verifyOtp: async ({ challengeId, code }: OtpVerification): Promise<OtpVerificationResult> => {
    await waitForMockResponse();

    if (challengeId !== mockChallengeId || code !== MOCK_OTP_CODE) throw new AuthApiError("INVALID_OTP");
    return { resetToken: mockResetToken };
  },

  resetPassword: async ({ resetToken, password }: PasswordResetCompletion): Promise<void> => {
    await waitForMockResponse();

    if (resetToken !== mockResetToken) throw new AuthApiError("INVALID_RESET_TOKEN");
    if (!password.trim()) throw new AuthApiError("SERVER_ERROR");
  },
};