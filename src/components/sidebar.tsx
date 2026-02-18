"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/types";
import { PriceFilter } from "./PriceFilter";
import { cn } from "@/lib/utils"; // Shadcn utility for cleaner class merging
import SearchBox from "./SearchBox";

export default function Sidebar({
  categories,
  priceBounds = { min: 0, max: 10000000 }, // Default fallback
}: {
  categories: Category[];
  priceBounds: { min: number; max: number };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const safeMin = Number(priceBounds?.min) || 0;
  const safeMax = Number(priceBounds?.max) || 10000000;

  const currentMin = Number(searchParams.get("min_price")) || safeMin;
  const currentMax = Number(searchParams.get("max_price")) || safeMax;

  const activeCategory = searchParams.get("category") || "";

  const handlePriceCommit = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("min_price", values[0].toString());
    params.set("max_price", values[1].toString());
    router.push(`/shop?${params.toString()}`);
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // We navigate to /shop (or /catalog) with the new params
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 space-y-10 pr-0 lg:pr-8">
      <SearchBox />

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
          currentMin={currentMin}
          currentMax={currentMax}
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
