"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/utils/cn";

import { Input, type InputProps } from "./Input";

export type PasswordInputProps = Omit<InputProps, "type">;

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <Input type={isVisible ? "text" : "password"} className={cn("pr-12", className)} {...props} />
      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={isVisible}
        className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Icon className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
};
