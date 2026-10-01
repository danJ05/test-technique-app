"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/utils/cn";

const MASK_CHARACTER = "●";

export interface MaskedValueProps {
  value: string;
  /** Nom de la donnée masquée, utilisé dans le libellé du bouton (ex. « la clé d'accès »). */
  label: string;
  maskLength?: number;
  isVisible?: boolean;
  onVisibleChange?: (isVisible: boolean) => void;
  showToggle?: boolean;
  className?: string;
  valueClassName?: string;
  toggleClassName?: string;
}

export const MaskedValue = ({
  value,
  label,
  maskLength = 4,
  isVisible,
  onVisibleChange,
  showToggle = true,
  className,
  valueClassName,
  toggleClassName,
}: MaskedValueProps) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(false);
  const visible = isVisible ?? internalVisible;
  const Icon = visible ? EyeOff : Eye;

  const toggle = (): void => {
    setInternalVisible(!visible);
    onVisibleChange?.(!visible);
  };

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("tabular-nums", valueClassName ?? "tracking-[0.2em]")} aria-live="polite">
        {visible ? (
          value
        ) : (
          <>
            <span aria-hidden="true">{MASK_CHARACTER.repeat(maskLength)}</span>
            <span className="sr-only">{`${label} masqué`}</span>
          </>
        )}
      </span>
      {showToggle && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={visible}
          aria-label={visible ? `Masquer ${label}` : `Afficher ${label}`}
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            toggleClassName,
          )}
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </span>
  );
};
