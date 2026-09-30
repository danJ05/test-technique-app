import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const AuthCard = ({ title, description, children, className }: AuthCardProps) => (
  <section
    aria-labelledby="auth-card-title"
    className={cn(
      "relative flex min-h-[520px] w-full max-w-[443px] flex-col rounded-card bg-white px-6 py-8 shadow-auth sm:min-h-[640px] sm:px-10 sm:py-11",
      className,
    )}
  >
    <header className="mb-8 sm:mb-10">
      <h1 id="auth-card-title" className="text-[28px] font-black leading-tight text-ink sm:text-[36px]">
        {title}
      </h1>
      <p className="mt-1 text-base font-medium leading-snug text-ink">{description}</p>
    </header>
    <div className="flex flex-1 flex-col">{children}</div>
  </section>
);
