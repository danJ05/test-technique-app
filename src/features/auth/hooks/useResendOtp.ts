"use client";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/services/auth";

export const useResendOtp = () => useMutation({ mutationFn: authApi.resendOtp });