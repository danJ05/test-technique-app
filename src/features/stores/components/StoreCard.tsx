import Link from "next/link";
import { ArrowUpRight, MapPin, Store } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export interface StoreCardProps {
  name: string;
  location: string;
  href: string;
  code?: string;
  isHighlighted?: boolean;
  className?: string;
}

export const StoreCard = ({ name, location, href, code, isHighlighted = false, className }: StoreCardProps) => (
  <Link
    href={href}
    aria-label={`Voir le magasin ${name}, ${location}`}
    className={cn(
      "group flex h-[150px] min-w-0 flex-col justify-between rounded-card p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-[170px]",
      isHighlighted
        ? "bg-linear-to-br from-primary-bright to-primary text-white"
        : "bg-white text-ink hover:bg-linear-to-br hover:from-primary-bright hover:to-primary hover:text-white",
      className,
    )}
  >
    <div className="flex items-start justify-between">
      <span
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-lg text-white transition-colors",
          isHighlighted ? "bg-white/30" : "bg-muted group-hover:bg-white/30",
        )}
      >
        <Store className="size-4" aria-hidden="true" />
      </span>
      <ArrowUpRight
        className={cn("size-5 transition-colors", isHighlighted ? "text-white" : "text-primary group-hover:text-white")}
        aria-hidden="true"
      />
    </div>

    <div className="min-w-0">
      <p className="truncate text-base font-bold">{name}</p>
      <p
        className={cn(
          "mt-1 flex min-w-0 items-center gap-3 text-[10px] transition-colors",
          isHighlighted ? "text-white/90" : "text-muted-foreground group-hover:text-white/90",
        )}
      >
        {code && <span className="shrink-0">{code}</span>}
        <span className="flex min-w-0 items-center gap-1">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{location}</span>
        </span>
      </p>
    </div>
  </Link>
);
