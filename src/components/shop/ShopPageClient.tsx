"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import { ShopResultsClient } from "@/components/shop/ShopResultsClient";
import type { Category, ProductCard } from "@/lib/types";

type Props = {
  categories: Category[];
  priceBounds: { min: number; max: number };
  initialProducts: ProductCard[];
  categoryName: string;
};

export function ShopPageClient({
  categories,
  priceBounds,
  initialProducts,
  categoryName,
}: Props) {
  const [hasVisualSearch, setHasVisualSearch] = useState(false);

  const handleVisualSearchResults = useCallback(
    (products: ProductCard[], isActive: boolean) => {
      setHasVisualSearch(isActive);
      setHasVisualSearch(isActive);
    },
    []
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 my-10">
      <Sidebar
        categories={categories}
        priceBounds={priceBounds}
        onVisualSearchResults={handleVisualSearchResults}
      />

      <main className="flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            {categoryName}
          </h1>
          {hasVisualSearch && (
            <p className="text-sm text-gray-600 mt-2">
              📷 Showing AI-matched results from visual search
            </p>
          )}
        </header>

        <ShopResultsClient initialProducts={initialProducts} />
      </main>
    </div>
  );
}
