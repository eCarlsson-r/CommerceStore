"use client";

import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

export function PriceFilter({
  onCommit,
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
}: {
  onCommit: (values: number[]) => void;
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
}) {
  // Local state for immediate UI feedback while dragging
  const [range, setRange] = useState([currentMin, currentMax]);

  useEffect(() => {
    setRange([currentMin, currentMax]);
  }, [currentMin, currentMax]);

  const dynamicStep = (maxPrice - minPrice) / 100;

  return (
    <div className="space-y-6">
      <Slider
        value={range}
        min={minPrice}
        max={maxPrice}
        step={dynamicStep}
        onValueChange={setRange}
        onValueCommit={onCommit}
        className="py-4"
      />

      <div className="flex justify-between items-center px-1">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">
            Min Price
          </span>
          <span className="text-[11px] font-bold text-primary italic">
            {Number(range[0])
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(",00", ",-")}
          </span>
        </div>

        <div className="h-px w-4 bg-gray-200" />

        <div className="flex flex-col text-right">
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">
            Max Price
          </span>
          <span className="text-[11px] font-bold text-primary italic">
            {Number(range[1])
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(",00", ",-")}
          </span>
        </div>
      </div>
    </div>
  );
}
