"use client";

import { useCallback, useMemo, useState } from "react";
import { VisualSearchBar } from "@/components/ai/VisualSearchBar";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import type { ProductCard } from "@/lib/types";

type Props = {
  initialProducts: ProductCard[];
};

export function ShopResultsClient({ initialProducts }: Props) {
  const [visualProducts, setVisualProducts] = useState<ProductCard[] | null>(null);

  const displayedProducts = useMemo(() => {
    if (visualProducts === null) return initialProducts;
    return visualProducts;
  }, [initialProducts, visualProducts]);

  const handleProductsResolved = useCallback((products: ProductCard[]) => {
    setVisualProducts(products);
  }, []);

  const handleClearVisualSearch = useCallback(() => {
    setVisualProducts(null);
  }, []);

  return (
    <>
      <VisualSearchBar
        renderInlineResults={false}
        onProductsResolved={handleProductsResolved}
        onClearVisualSearch={handleClearVisualSearch}
      />

      {visualProducts !== null && (
        <p className="mb-4 text-sm text-gray-600">
          Showing {displayedProducts.length} visual match
          {displayedProducts.length === 1 ? "" : "es"} from AI search.
        </p>
      )}

      <ProductGrid products={displayedProducts} />
    </>
  );
}
