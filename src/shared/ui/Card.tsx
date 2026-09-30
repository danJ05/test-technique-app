import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export type CardElement = "div" | "section" | "article" | "aside";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
}

export const Card = ({ as: Component = "div", className, ...props }: CardProps) => (
  <Component className={cn("rounded-card bg-white p-5 sm:p-6", className)} {...props} />
);
