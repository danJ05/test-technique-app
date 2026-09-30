import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export type ButtonVariant = "primary" | "outline" | "secondary" | "ghost";
export type ButtonSize = "auth" | "app" | "sm" | "xs";

const BASE_CLASSES =
  "inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline: "border-2 border-primary bg-white text-primary hover:bg-primary-soft",
  secondary: "bg-muted text-ink hover:bg-border",
  ghost: "text-ink hover:bg-muted",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  auth: "h-[60px] w-full max-w-[355px] rounded-pill px-6 text-base",
  app: "h-[50px] rounded-button px-5 text-sm sm:min-w-[194px] sm:px-6 sm:text-base",
  sm: "h-9 rounded-button px-3 text-sm",
  xs: "h-7 rounded-full px-3 text-xs",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** Classes du bouton, réutilisables sur un `next/link`. */
export const buttonClassName = ({
  variant = "primary",
  size = "app",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string =>
  cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], fullWidth && "w-full max-w-none", className);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonStyleOptions, "className"> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={buttonClassName({ variant, size, fullWidth, className })}
    {...props}
  >
    {isLoading ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : leftIcon}
    {children}
    {!isLoading && rightIcon}
  </button>
);
