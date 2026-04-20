"use client";

import { useMemo, useCallback } from "react";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import type { ProductCard } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {
  initialProducts: ProductCard[];
  visualSearchProducts?: ProductCard[] | null;
  hasVisualSearch?: boolean;
  onClearVisualSearch?: () => void;
};

export function ShopResultsClient({
  initialProducts,
  visualSearchProducts = null,
  hasVisualSearch = false,
  onClearVisualSearch,
}: Props) {
  const displayedProducts = useMemo(() => {
    if (visualSearchProducts && visualSearchProducts.length > 0) {
      return visualSearchProducts;
    }
    return initialProducts;
  }, [initialProducts, visualSearchProducts]);

  const isVisualSearchActive =
    hasVisualSearch && visualSearchProducts && visualSearchProducts.length > 0;

  const handleClearVisualSearch = useCallback(() => {
    onClearVisualSearch?.();
  }, [onClearVisualSearch]);

  return (
    <div className="space-y-6">
      {isVisualSearchActive && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div>
            <p className="text-sm font-semibold text-blue-900">
              🔍 Visual Search Results
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Showing {displayedProducts.length} AI-matched products from your image search
            </p>
          </div>
          <Button
            onClick={handleClearVisualSearch}
            variant="ghost"
            size="sm"
            className="ml-4"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {displayedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      <ProductGrid products={displayedProducts} />
    </div>
  );
}
