import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/shared/utils/cn";

export const filterChipClassName = (isActive: boolean, className?: string): string =>
  cn(
    "inline-flex h-8 shrink-0 items-center justify-center rounded-full px-4 text-[11px] italic transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    isActive ? "bg-primary-soft font-bold text-ink" : "bg-muted text-muted-foreground hover:bg-border",
    className,
  );

interface FilterChipBaseProps {
  label: string;
  isActive: boolean;
  className?: string;
}

export interface FilterChipLinkProps extends FilterChipBaseProps {
  href: string;
}

export interface FilterChipButtonProps
  extends FilterChipBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export type FilterChipProps = FilterChipLinkProps | FilterChipButtonProps;

export const FilterChip = (props: FilterChipProps) => {
  if (props.href !== undefined) {
    const { label, isActive, className, href } = props;

    return (
      <Link href={href} aria-current={isActive ? "true" : undefined} className={filterChipClassName(isActive, className)}>
        {label}
      </Link>
    );
  }

  const { label, isActive, className, type = "button", ...buttonProps } = props;

  return (
    <button type={type} aria-pressed={isActive} className={filterChipClassName(isActive, className)} {...buttonProps}>
      {label}
    </button>
  );
};
