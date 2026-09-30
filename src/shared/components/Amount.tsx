import { cn } from "@/shared/utils/cn";
import { formatCurrency } from "@/shared/utils/format-currency";

export interface AmountProps {
  value: number;
  signed?: boolean;
  colored?: boolean;
  className?: string;
}

export const Amount = ({ value, signed = true, colored = false, className }: AmountProps) => (
  <span className={cn("whitespace-nowrap tabular-nums", colored && value > 0 && "text-success", className)}>
    {formatCurrency(value, { signed })}
  </span>
);
