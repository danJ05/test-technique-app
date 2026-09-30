"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { cn } from "@/shared/utils/cn";

export interface SelectOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

export type SelectVariant = "pill" | "compact";

const TRIGGER_VARIANT_CLASSES: Record<SelectVariant, string> = {
  pill: "h-10 min-w-[160px] rounded-full bg-muted px-4 text-xs",
  compact: "h-8 rounded-full border border-border bg-white px-3 text-[11px]",
};

export interface SelectProps<TValue extends string = string> {
  options: SelectOption<TValue>[];
  "aria-label": string;
  value?: TValue | null;
  defaultValue?: TValue | null;
  onChange?: (value: TValue) => void;
  placeholder?: string;
  name?: string;
  variant?: SelectVariant;
  disabled?: boolean;
  className?: string;
}

export const Select = <TValue extends string = string>({
  options,
  "aria-label": ariaLabel,
  value,
  defaultValue = null,
  onChange,
  placeholder = "Sélectionner",
  name,
  variant = "pill",
  disabled = false,
  className,
}: SelectProps<TValue>) => {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [internalValue, setInternalValue] = useState<TValue | null>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const selectedValue = value !== undefined ? value : internalValue;
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const close = useCallback((): void => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  const open = (): void => {
    if (disabled || options.length === 0) return;
    setActiveIndex(Math.max(selectedIndex, 0));
    setIsOpen(true);
  };

  const selectOption = (option: SelectOption<TValue>): void => {
    setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      open();
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>): void => {
    const lastIndex = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, lastIndex));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(lastIndex);
        break;
      case "Enter":
      case " ": {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) selectOption(option);
        break;
      }
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {name && <input type="hidden" name={name} value={selectedValue ?? ""} />}
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
          TRIGGER_VARIANT_CLASSES[variant],
        )}
      >
        <span className={cn("truncate italic", selectedOption ? "text-ink" : "text-muted-foreground")}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-ink/70 transition-transform", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-activedescendant={`${listboxId}-option-${activeIndex}`}
          onKeyDown={handleListKeyDown}
          className="absolute right-0 z-30 mt-1 max-h-64 min-w-full overflow-auto rounded-button bg-white py-1 shadow-popover focus:outline-none"
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;

            return (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 whitespace-nowrap px-3 py-2 text-xs italic",
                  index === activeIndex && "bg-surface",
                  isSelected ? "font-bold text-ink" : "text-muted-foreground",
                )}
              >
                {option.label}
                {isSelected && <Check className="size-3.5 text-primary" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
