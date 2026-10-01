import type { Metadata } from "next";
import { Suspense } from "react";

import { StoreDetailContainer, StoreDetailLoading } from "@/features/store-detail";

export const metadata: Metadata = { title: "Détails magasin" };

export default async function StoreDetailPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;

  return (
    <Suspense fallback={<StoreDetailLoading />}>
      <StoreDetailContainer storeId={storeId} />
    </Suspense>
  );
}