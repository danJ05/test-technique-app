"use client";

import { useEffect, useState } from "react";

import { SearchInput } from "@/shared/ui/SearchInput";
import type { SearchInputProps } from "@/shared/ui/SearchInput";

export interface DebouncedSearchInputProps extends Omit<SearchInputProps, "value" | "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
  delayMs?: number;
}

export const DebouncedSearchInput = ({ value, onValueChange, delayMs = 300, ...inputProps }: DebouncedSearchInputProps) => {
  const [draftState, setDraftState] = useState({ committedValue: value, draft: value });
  const draft = draftState.committedValue === value ? draftState.draft : value;

  useEffect(() => {
    if (draft === value) return;

    const timeout = window.setTimeout(() => onValueChange(draft), delayMs);
    return () => window.clearTimeout(timeout);
  }, [delayMs, draft, onValueChange, value]);

  return (
    <SearchInput
      {...inputProps}
      value={draft}
      onChange={(event) => setDraftState({ committedValue: value, draft: event.currentTarget.value })}
    />
  );
};