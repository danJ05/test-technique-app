import { cn } from "@/shared/utils/cn";

export interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div aria-hidden="true" className={cn("animate-pulse rounded-button bg-muted", className)} />
);
