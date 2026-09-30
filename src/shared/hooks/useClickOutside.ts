import { useEffect, type RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent): void => {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, onOutsideClick, enabled]);
};
