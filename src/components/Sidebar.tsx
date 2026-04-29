"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from 'next-intl';
import { Category, ProductCard } from "@/lib/types";
import { PriceFilter } from "./PriceFilter";
import { VisualSearchBar } from "./ai/VisualSearchBar";
import { cn } from "@/lib/utils";
import SearchBox from "./SearchBox";

export default function Sidebar({
  categories,
  priceBounds = { min: 0, max: 10000000 },
  onVisualSearchResults,
}: {
  categories: Category[];
  priceBounds: { min: number; max: number };
  onVisualSearchResults?: (products: ProductCard[], hasVisualSearch: boolean) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const safeMin = Number(priceBounds?.min) || 0;
  const safeMax = Number(priceBounds?.max) || 10000000;

  const [value, setValue] = useState<[number, number]>([
    Number(searchParams.get("min_price")) || safeMin, 
    Number(searchParams.get("max_price")) || safeMax
  ]);

  const activeCategory = searchParams.get("category") || "";

  const handlePriceCommit = useCallback(
    (values: number[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("min_price", Math.round(values[0]).toString());
      params.set("max_price", Math.round(values[1]).toString());
      router.push(`/${locale}/shop?${params.toString()}`);
    },
    [searchParams, router, locale]
  );

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/${locale}/shop?${params.toString()}`);
    },
    [searchParams, router, locale]
  );

  const handleVisualSearchResolved = useCallback(
    (products: ProductCard[]) => {
      onVisualSearchResults?.(products, true);
    },
    [onVisualSearchResults]
  );

  const handleVisualSearchClear = useCallback(() => {
    onVisualSearchResults?.([], false);
  }, [onVisualSearchResults]);

  return (
    <aside className="w-full lg:w-64 space-y-10 pr-0 lg:pr-8">
      <SearchBox />

      {/* Visual Search */}
      <div className="border-b pb-8">
        <VisualSearchBar
          renderInlineResults={false}
          onProductsResolved={handleVisualSearchResolved}
          onClearVisualSearch={handleVisualSearchClear}
        />
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
          Collections
        </h3>
        <ul className="space-y-3">
          <li
            onClick={() => updateFilter("category", "")}
            className={cn(
              "cursor-pointer text-sm transition-all flex justify-between items-center group",
              activeCategory === ""
                ? "font-black text-primary"
                : "font-medium text-gray-500 hover:text-gray-900",
            )}
          >
            <span>All Products</span>
            {activeCategory === "" && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            )}
          </li>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <li
                key={cat.id}
                onClick={() => updateFilter("category", cat.slug)}
                className={cn(
                  "cursor-pointer text-sm transition-all flex justify-between items-center group",
                  isActive
                    ? "font-black text-primary"
                    : "font-medium text-gray-500 hover:text-gray-900",
                )}
              >
                <span className="capitalize">{cat.name.toLowerCase()}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
          Price Range
        </h3>
        <PriceFilter
          minPrice={safeMin}
          maxPrice={safeMax}
          value={value}
          onChange={setValue}
          onCommit={handlePriceCommit}
        />
        {searchParams.get("min_price") && searchParams.get("max_price") && (
          <button
            onClick={() => {
              handlePriceCommit([safeMin, safeMax]);
            }}
            className="w-full mt-4 py-2 text-[9px] font-black uppercase text-gray-400 border border-gray-100 rounded-xl hover:bg-gray-50"
          >
            Reset Price
          </button>
        )}
      </div>
    </aside>
  );
}
