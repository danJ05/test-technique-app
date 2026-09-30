import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "aria-label"> {
  "aria-label": string;
  containerClassName?: string;
}

export const SearchInput = ({ className, containerClassName, ...props }: SearchInputProps) => (
  <div className={cn("relative w-full", containerClassName)}>
    <Search
      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      aria-hidden="true"
    />
    <input
      type="search"
      className={cn(
        "h-10 w-full rounded-full bg-muted pl-10 pr-4 text-xs text-ink placeholder:italic placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
        className,
      )}
      {...props}
    />
  </div>
);
