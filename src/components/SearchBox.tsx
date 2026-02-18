"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state to keep the input responsive
  const [text, setText] = useState(searchParams.get("search") || "");

  // Inside SearchBox.tsx
  useEffect(() => {
    // Only trigger redirect if the text actually differs from the URL
    // and we have a query worth searching for.
    const isDifferent = text !== (searchParams.get("search") || "");

    const delayDebounceFn = setTimeout(() => {
      if (isDifferent) {
        const params = new URLSearchParams(searchParams.toString());
        if (text) params.set("search", text);
        else params.delete("search");

        // Navigate to shop ONLY if we have a query or were already on the shop page
        router.push(`/shop?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text, router, searchParams]); // Only track 'text' to prevent loop from searchParams changes

  return (
    <div className="relative group w-full max-w-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search jewelry, SKU, or name..."
        className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 ring-primary/20 focus:border-primary transition-all text-sm font-medium"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      {text && (
        <button
          onClick={() => setText("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
