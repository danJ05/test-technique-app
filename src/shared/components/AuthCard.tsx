import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export const AuthCard = ({ title, description, children, className, compact = false }: AuthCardProps) => (
  <section
    aria-labelledby="auth-card-title"
    className={cn(
      "relative flex w-full flex-col rounded-card bg-white shadow-auth",
      compact
        ? "min-h-122.5 max-w-85 px-7.5 py-8"
        : "min-h-130 max-w-110.75 px-6 py-8 sm:min-h-160 sm:px-10 sm:py-11",
      className,
    )}
  >
    <header className={cn("mb-8", !compact && "sm:mb-10")}>
      <h1
        id="auth-card-title"
        className={cn("font-black leading-tight text-ink", compact ? "text-[25px]" : "text-[28px] sm:text-[36px]")}
      >
        {title}
      </h1>
      <p className={cn("mt-1 font-medium leading-snug text-ink", compact ? "text-sm" : "text-base")}>
        {description}
      </p>
    </header>
    <div className="flex flex-1 flex-col">{children}</div>
  </section>
);
