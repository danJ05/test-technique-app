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

const CONTAINER_CLASSES = "inline-flex w-fit max-w-full gap-1 rounded-[12px] border-2 border-muted bg-muted p-0.5";

const ITEM_CLASSES =
  "inline-flex h-9 min-w-[100px] flex-1 items-center justify-center rounded-button px-4 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-[130px]";

const itemClassName = (isActive: boolean): string =>
  cn(ITEM_CLASSES, isActive ? "bg-white text-ink shadow-sm" : "text-ink/80 hover:text-ink");

/**
 * Avec `href`, les segments sont des liens de navigation (`aria-current`) ;
 * sinon, des boutons bascule (`aria-pressed`). Pas de rôles `tab` : ils imposeraient
 * une navigation aux flèches et des `tabpanel` reliés.
 */
export const SegmentedControl = <TValue extends string = string>({
  items,
  value,
  "aria-label": ariaLabel,
  onChange,
  className,
}: SegmentedControlProps<TValue>) => {
  if (items.every((item) => item.href)) {
    return (
      <nav aria-label={ariaLabel} className={cn(CONTAINER_CLASSES, className)}>
        {items.map((item) => (
          <Link
            key={item.value}
            href={item.href ?? ""}
            aria-current={item.value === value ? "page" : undefined}
            scroll={false}
            className={itemClassName(item.value === value)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div role="group" aria-label={ariaLabel} className={cn(CONTAINER_CLASSES, className)}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={item.value === value}
          onClick={() => onChange?.(item.value)}
          className={itemClassName(item.value === value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
