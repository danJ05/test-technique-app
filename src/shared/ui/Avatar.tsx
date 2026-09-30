import { CircleUserRound } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export type AvatarSize = "sm" | "md";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
};

export interface AvatarProps {
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export const Avatar = ({ name, size = "md", className }: AvatarProps) => (
  <span
    role="img"
    aria-label={name ?? "Utilisateur"}
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-full bg-muted font-bold text-ink/60",
      SIZE_CLASSES[size],
      className,
    )}
  >
    {name ? getInitials(name) : <CircleUserRound className="size-3/5 text-white" strokeWidth={2.5} aria-hidden="true" />}
  </span>
);
