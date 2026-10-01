import type { Metadata } from "next";
import { Suspense } from "react";

import { StoresContainer, StoresLoading } from "@/features/stores";

export const metadata: Metadata = { title: "Magasins" };

export default function StorePage() {
  return (
    <Suspense fallback={<StoresLoading />}>
      <StoresContainer />
    </Suspense>
  );
}