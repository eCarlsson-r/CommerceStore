"use client";

import { useMemo } from "react";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import type { ProductCard } from "@/lib/types";

type Props = {
  initialProducts: ProductCard[];
  visualProducts?: ProductCard[] | null;
};

export function ShopResultsClient({ initialProducts, visualProducts = null }: Props) {
  const displayedProducts = useMemo(() => {
    return visualProducts === null ? initialProducts : visualProducts;
  }, [initialProducts, visualProducts]);

  return <ProductGrid products={displayedProducts} />;
}
