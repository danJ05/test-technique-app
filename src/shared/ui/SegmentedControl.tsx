import Link from "next/link";

import { cn } from "@/shared/utils/cn";

export interface SegmentedControlItem<TValue extends string = string> {
  value: TValue;
  label: string;
  href?: string;
}

export interface SegmentedControlProps<TValue extends string = string> {
  items: SegmentedControlItem<TValue>[];
  value: TValue;
  "aria-label": string;
  onChange?: (value: TValue) => void;
  className?: string;
}

const ITEM_CLASSES =
  "inline-flex h-9 min-w-[100px] flex-1 items-center justify-center rounded-button px-4 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-[130px]";

export const SegmentedControl = <TValue extends string = string>({
  items,
  value,
  "aria-label": ariaLabel,
  onChange,
  className,
}: SegmentedControlProps<TValue>) => (
  <div
    role="tablist"
    aria-label={ariaLabel}
    className={cn("inline-flex w-fit max-w-full gap-1 rounded-[12px] border-2 border-muted bg-muted p-0.5", className)}
  >
    {items.map((item) => {
      const isActive = item.value === value;
      const itemClassName = cn(ITEM_CLASSES, isActive ? "bg-white text-ink shadow-sm" : "text-ink/80 hover:text-ink");

      return item.href ? (
        <Link
          key={item.value}
          href={item.href}
          role="tab"
          aria-selected={isActive}
          scroll={false}
          className={itemClassName}
        >
          {item.label}
        </Link>
      ) : (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange?.(item.value)}
          className={itemClassName}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);
