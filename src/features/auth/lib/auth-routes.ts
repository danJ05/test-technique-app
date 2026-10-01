export const authRoutes = {
  login: "/login",
  dashboard: "/dashboard",
  forgotPassword: "/forgot-password",
  verifyOtp: (challengeId: string) => `/verify-otp?challenge=${encodeURIComponent(challengeId)}`,
  resetPassword: (token: string) => `/reset-password?token=${encodeURIComponent(token)}`,
};