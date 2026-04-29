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
    <section className="mb-8 rounded-2xl border border-gray-200 p-4">
      <h2 className="text-xs font-black uppercase tracking-widest text-gray-600 mb-2">
        AI Visual Search
      </h2>
      <div className="flex flex-row md:flex-col gap-3">
        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Paste room photo URL to find similar wallpapers"
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
        />
        <Button
          className="bg-primary text-white"
          onClick={() => visualSearch.mutate({ imageUrl, maxResults: 6 })}
          disabled={!imageUrl || visualSearch.isPending}
        >
          {visualSearch.isPending ? "Searching..." : "Find Similar"}
        </Button>
        <Button
          variant="outline"
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

      {renderInlineResults && !!visualSearch.data?.items.length && (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-700">Visual matches for your room:</p>
          {isLoadingProducts ? (
            <p className="text-sm text-gray-500">Loading matched products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((product) => (
                <ProductView key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
      {visualSearch.isError && (
        <p className="mt-3 text-sm text-amber-600">
          Visual search is unavailable right now.
        </p>
      )}
    </section>
  );
}
