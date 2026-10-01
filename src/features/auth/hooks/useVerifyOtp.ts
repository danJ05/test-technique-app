"use client";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/services/auth";

export const useVerifyOtp = () => useMutation({ mutationFn: authApi.verifyOtp });