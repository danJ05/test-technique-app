import type { AuthApiErrorCode } from "./types";

export class AuthApiError extends Error {
  constructor(public readonly code: AuthApiErrorCode) {
    super(code);
    this.name = "AuthApiError";
  }
}