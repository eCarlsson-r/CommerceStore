// components/product/ImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Media } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ImageGallery({
  items,
  mainImage,
}: {
  items: Media[];
  mainImage: string;
}) {
  // Default to the main stock image, or the first item in media
  const [activeImage, setActiveImage] = useState(mainImage || items[0]?.path);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Feature Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[3rem] bg-gray-50 border border-gray-100 shadow-inner">
        <Image
          src={activeImage
                ? activeImage.startsWith("http")
                    ? activeImage
                    : "http://localhost:8000/storage/" + activeImage
                : "https://placehold.co/1000x1000/png"}
          alt="Product View"
          fill
          className="object-cover transition-all duration-700 hover:scale-110"
          priority
        />
      </div>

      {/* Thumbnails Grid */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {items.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img.path)}
            className={cn(
              "relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
              activeImage === img.path
                ? "border-primary ring-4 ring-primary/10"
                : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={img.path}
              alt={`Thumbnail ${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
