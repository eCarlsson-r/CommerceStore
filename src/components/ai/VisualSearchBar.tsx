"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useVisualSearch } from "@/hooks/useAI";
import api from "@/lib/api";
import type { ProductCard } from "@/lib/types";
import { ProductView } from "@/components/ecommerce/ProductView";

type VisualSearchBarProps = {
  onProductsResolved?: (products: ProductCard[]) => void;
  onClearVisualSearch?: () => void;
  renderInlineResults?: boolean;
};

export function VisualSearchBar({
  onProductsResolved,
  onClearVisualSearch,
  renderInlineResults = true,
}: VisualSearchBarProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const visualSearch = useVisualSearch();

  useEffect(() => {
    const ids = visualSearch.data?.items.map((item) => item.productId) || [];
    if (!ids.length) {
      setProducts([]);
      onProductsResolved?.([]);
      return;
    }

    let isCancelled = false;
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const responses = await Promise.all(
          ids.map((id) => api.get(`/ecommerce/products/${id}`)),
        );
        if (isCancelled) return;
        const next = responses
          .map((res) => {
            const payload = "data" in res.data ? res.data.data : res.data;
            return payload?.product || payload;
          })
          .filter(Boolean) as ProductCard[];
        setProducts(next);
        onProductsResolved?.(next);
      } catch {
        if (!isCancelled) {
          setProducts([]);
          onProductsResolved?.([]);
        }
      } finally {
        if (!isCancelled) setIsLoadingProducts(false);
      }
    };

    void fetchProducts();
    return () => {
      isCancelled = true;
    };
  }, [onProductsResolved, visualSearch.data]);

  return (
    <section>
      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
        Visual Search
      </h2>
      <div className="space-y-3">
        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Paste room photo URL..."
          className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-1 ring-primary/20 focus:border-primary transition-all text-sm font-medium"
        />
        <div className="flex gap-2">
          <Button
            className="flex-1 h-9 bg-primary text-white text-xs font-bold"
            onClick={() => visualSearch.mutate({ imageUrl, maxResults: 6 })}
            disabled={!imageUrl || visualSearch.isPending}
          >
            {visualSearch.isPending ? "Searching..." : "Find Similar"}
          </Button>
          <Button
            variant="outline"
            className="h-9 px-3 text-xs font-bold"
            onClick={() => {
              setImageUrl("");
              setProducts([]);
              onProductsResolved?.([]);
              onClearVisualSearch?.();
            }}
            disabled={visualSearch.isPending && !products.length}
          >
            Reset
          </Button>
        </div>
      </div>

      {renderInlineResults && !!visualSearch.data?.items.length && (
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold text-gray-700">Matched wallpapers:</p>
          {isLoadingProducts ? (
            <p className="text-xs text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {products.map((product) => (
                <ProductView key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
      {visualSearch.isError && (
        <p className="mt-3 text-xs text-amber-600">
          Visual search unavailable.
        </p>
      )}
    </section>
  );
}
