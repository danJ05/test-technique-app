import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export type CardElement = "div" | "section" | "article" | "aside";
export type CardTone = "default" | "primary" | "primary-soft";

const TONE_CLASSES: Record<CardTone, string> = {
  default: "bg-white",
  primary: "bg-primary",
  "primary-soft": "bg-primary-soft",
};

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
  tone?: CardTone;
}

export const Card = ({ as: Component = "div", tone = "default", className, ...props }: CardProps) => (
  <Component className={cn("rounded-card p-5 sm:p-6", TONE_CLASSES[tone], className)} {...props} />
);
