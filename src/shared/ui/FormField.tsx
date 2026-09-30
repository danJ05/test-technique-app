import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export const getFieldErrorId = (fieldId: string): string => `${fieldId}-error`;

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Le champ enfant doit porter `id={id}` et `aria-describedby={getFieldErrorId(id)}` quand `error` est présent. */
export const FormField = ({ id, label, error, children, className }: FormFieldProps) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <label htmlFor={id} className="px-0.5 text-xs font-medium text-ink">
      {label}
    </label>
    {children}
    {error && (
      <p id={getFieldErrorId(id)} role="alert" className="px-0.5 text-xs font-medium text-primary">
        {error}
      </p>
    )}
  </div>
);
