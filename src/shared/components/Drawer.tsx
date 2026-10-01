"use client";

import { useEffect, useId, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { cn } from "@/shared/utils/cn";

export interface DrawerProps {
  title: string;
  children: ReactNode;
  /** Fermeture pilotée par l'état local. */
  onClose?: () => void;
  /** Fermeture pilotée par l'URL (ex. retrait du paramètre `?cashier=`). */
  closeHref?: string;
  className?: string;
}

const CLOSE_BUTTON_CLASSES =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary";

const FOCUSABLE_SELECTOR =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

/** Modale plein écran sur mobile (focus piégé), colonne latérale à partir de `lg`. */
export const Drawer = ({ title, children, onClose, closeHref, className }: DrawerProps) => {
  const router = useRouter();
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeLinkRef = useRef<HTMLAnchorElement>(null);
  const isModal = !useMediaQuery("(min-width: 1024px)");

  // Focus sur le bouton de fermeture à l'ouverture, puis retour à l'élément d'origine à la fermeture.
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    (closeButtonRef.current ?? closeLinkRef.current)?.focus({ preventScroll: true });
    return () => {
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
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

  useEffect(() => {
    if (!isModal) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isModal]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLElement>): void => {
    if (!isModal || event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeIcon = <X className="size-6" aria-hidden="true" />;

  return (
    <aside
      ref={panelRef}
      role={isModal ? "dialog" : undefined}
      aria-modal={isModal || undefined}
      aria-labelledby={titleId}
      onKeyDown={trapFocus}
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
