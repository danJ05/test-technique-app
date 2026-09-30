import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export type BadgeVariant = "success" | "neutral";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  success: "bg-success",
  neutral: "bg-disabled",
};

export interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export const Badge = ({ variant, children, className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex h-6 min-w-[60px] items-center justify-center rounded-md px-3 text-xs font-bold text-white",
      VARIANT_CLASSES[variant],
      className,
    )}
  >
    {children}
  </span>
);
