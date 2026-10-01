import Link from "next/link";
import { ArrowUpRight, MapPin, Store } from "lucide-react";

import { routes } from "@/shared/config/routes";
import type { DashboardStore } from "@/services/dashboard";

export const TopStoreTile = ({ id, name, code, location }: DashboardStore) => (
  <Link
    href={routes.storeDetail(id)}
    aria-label={`Voir le magasin ${name}, ${location}`}
    className="flex h-50 w-62.5 shrink-0 snap-start flex-col justify-between rounded-[36px] bg-white pb-7 pl-7 pr-6 pt-7 transition-shadow hover:shadow-popover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    <div className="flex items-start justify-between">
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#d6d6d6]">
        <Store className="size-5 text-white" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <ArrowUpRight className="size-8 text-primary" strokeWidth={2} aria-hidden="true" />
    </div>
    <div className="min-w-0">
      <p className="truncate text-xl leading-6 font-bold tracking-[-0.3px] text-black">{name}</p>
      <p className="mt-0.75 flex min-w-0 items-center text-[11.5px] leading-4 text-muted-foreground">
        <span className="shrink-0">{code}</span>
        <MapPin className="ml-3.5 size-2.75 shrink-0" strokeWidth={2} aria-hidden="true" />
        <span className="ml-1 truncate">{location}</span>
      </p>
    </div>
  </Link>
);
