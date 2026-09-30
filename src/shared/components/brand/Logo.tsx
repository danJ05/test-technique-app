import Image from "next/image";

import { cn } from "@/shared/utils/cn";

const LOGO_WIDTH = 113;
const LOGO_HEIGHT = 44;

export interface LogoProps {
  className?: string;
  priority?: boolean;
}

export const Logo = ({ className, priority = false }: LogoProps) => (
  <Image
    src="/images/logo-auchan.svg"
    alt="Auchan"
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    priority={priority}
    className={cn("h-auto w-[90px] sm:w-[113px]", className)}
  />
);
