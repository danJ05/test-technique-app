import Image from "next/image";

import { cn } from "@/shared/utils/cn";

const BIRD_WIDTH = 1436;
const BIRD_HEIGHT = 860;

export interface BirdIllustrationProps {
  className?: string;
  priority?: boolean;
}

/** L'opacité à 30 % est intégrée au fichier SVG : ne pas ajouter de classe opacity. */
export const BirdIllustration = ({ className, priority = false }: BirdIllustrationProps) => (
  <Image
    src="/images/bird-auchan.svg"
    alt=""
    aria-hidden="true"
    width={BIRD_WIDTH}
    height={BIRD_HEIGHT}
    priority={priority}
    draggable={false}
    className={cn("pointer-events-none select-none", className)}
  />
);
