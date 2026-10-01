"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Avatar } from "@/shared/ui/Avatar";
import { routes } from "@/shared/config/routes";
import { IconButton } from "@/shared/ui/IconButton";
import { cn } from "@/shared/utils/cn";

import { Logo } from "./brand/Logo";

export interface AppNavItem {
  label: string;
  /** Sans `href`, l'entrée est affichée mais désactivée (page non disponible). */
  href?: string;
  activePaths?: readonly string[];
}

export interface AppHeaderProps {
  items: AppNavItem[];
  homeHref?: string;
  userName?: string;
  className?: string;
}

const isPathActive = (pathname: string, href: string): boolean =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const NAV_ITEM_CLASSES =
  "inline-flex h-9 items-center whitespace-nowrap rounded-button px-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

interface NavItemProps {
  item: AppNavItem;
  pathname: string;
  onNavigate?: () => void;
}

const NavItem = ({ item, pathname, onNavigate }: NavItemProps) => {
  if (!item.href) {
    return (
      <span role="link" aria-disabled="true" className={cn(NAV_ITEM_CLASSES, "cursor-not-allowed text-ink")}>
        {item.label}
      </span>
    );
  }

  const isActive = [item.href, ...(item.activePaths ?? [])].some((href) => isPathActive(pathname, href));

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(NAV_ITEM_CLASSES, isActive ? "bg-primary text-white" : "text-ink hover:bg-primary-soft")}
    >
      {item.label}
    </Link>
  );
};

export const AppHeader = ({ items, homeHref = routes.dashboard, userName, className }: AppHeaderProps) => {
  const pathname = usePathname();
  const mobileNavId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = (): void => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className={cn("relative z-10 rounded-card bg-white px-5 sm:px-8", className)}>
      <div className="flex h-[72px] items-center justify-between gap-4">
        <Link
          href={homeHref}
          aria-label="Auchan, retour à l'accueil"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Logo priority />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {items.map((item) => (
              <li key={item.label}>
                <NavItem item={item} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Avatar name={userName} />
          <IconButton
            ref={menuButtonRef}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls={mobileNavId}
            onClick={() => setIsMenuOpen((open) => !open)}
            icon={isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            size="md"
            className="lg:hidden"
          />
        </div>
      </div>

      <nav
        id={mobileNavId}
        aria-label="Navigation principale"
        hidden={!isMenuOpen}
        className="border-t border-muted pb-4 pt-3 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.label}>
              <NavItem item={item} pathname={pathname} onNavigate={closeMenu} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
