export const routes = {
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  verifyOtp: (challengeId: string) => `/verify-otp?challenge=${encodeURIComponent(challengeId)}`,
  resetPassword: (token: string) => `/reset-password?token=${encodeURIComponent(token)}`,
  dashboard: "/dashboard",
  stores: "/store",
  storeDetail: (storeId: string) => `/store/${encodeURIComponent(storeId)}`,
} as const;
