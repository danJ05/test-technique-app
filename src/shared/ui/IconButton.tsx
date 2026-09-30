import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { Tooltip } from "./Tooltip";

export type IconButtonVariant = "ghost" | "soft";
export type IconButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  ghost: "text-ink/70 hover:bg-muted hover:text-ink",
  soft: "bg-muted text-ink hover:bg-border",
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
};

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  "aria-label": string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  tooltip?: string;
}

export const IconButton = ({
  icon,
  variant = "ghost",
  size = "sm",
  tooltip,
  className,
  type = "button",
  ...props
}: IconButtonProps) => {
  const button = (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );

  return tooltip ? <Tooltip label={tooltip}>{button}</Tooltip> : button;
};
