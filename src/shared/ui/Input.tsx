import type { ComponentPropsWithRef } from "react";

import { cn } from "@/shared/utils/cn";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  hasError?: boolean;
}

export const Input = ({ hasError = false, className, ref, ...props }: InputProps) => (
  <input
    ref={ref}
    aria-invalid={hasError || undefined}
    className={cn(
      "h-[50px] w-full rounded-button border bg-white px-4 text-sm text-ink transition-colors placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-surface",
      hasError
        ? "border-primary focus-visible:ring-primary/25"
        : "border-border focus:border-ink/40 focus-visible:ring-ink/10",
      className,
    )}
    {...props}
  />
);
