"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export interface DrawerProps {
  title: string;
  children: ReactNode;
  /** Fermeture pilotée par l'état local. */
  onClose?: () => void;
  /** Fermeture pilotée par l'URL (ex. retrait du paramètre `?caissier=`). */
  closeHref?: string;
  className?: string;
}

const CLOSE_BUTTON_CLASSES =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary";

/** Plein écran sur mobile, colonne latérale à partir de `lg`. */
export const Drawer = ({ title, children, onClose, closeHref, className }: DrawerProps) => {
  const router = useRouter();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    (closeButtonRef.current ?? closeLinkRef.current)?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      if (onClose) onClose();
      else if (closeHref) router.push(closeHref, { scroll: false });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, closeHref, router]);

  const closeIcon = <X className="size-6" aria-hidden="true" />;

  return (
    <aside
      aria-labelledby={titleId}
      className={cn(
        "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white lg:static lg:inset-auto lg:z-auto lg:self-start lg:rounded-card",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h2 id={titleId} className="truncate text-xl font-bold text-ink">
          {title}
        </h2>
        {closeHref && !onClose ? (
          <Link ref={closeLinkRef} href={closeHref} scroll={false} aria-label="Fermer le panneau" className={CLOSE_BUTTON_CLASSES}>
            {closeIcon}
          </Link>
        ) : (
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fermer le panneau" className={CLOSE_BUTTON_CLASSES}>
            {closeIcon}
          </button>
        )}
      </div>
      {children}
    </aside>
  );
};

export interface DrawerSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const DrawerSection = ({ title, children, className }: DrawerSectionProps) => (
  <section className={cn("border-t border-muted px-6 py-6", className)}>
    {title && <h3 className="mb-5 text-base font-bold text-ink">{title}</h3>}
    {children}
  </section>
);
