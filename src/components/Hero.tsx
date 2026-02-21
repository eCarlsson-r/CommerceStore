// components/Hero.tsx
"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Banner } from "@/lib/types";

export default function Hero({ banners }: { banners: Banner[] }) {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem]">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id || index} className="relative h-[500px]">
              <div className="relative w-full h-full">
                <Image
                  src={
                    banner.image_url ? banner.image_url.startsWith("http")
                      ? banner.image_url
                      : "http://localhost:8000/storage/" + banner.image_url
                    : "https://placehold.co/1280x960/png"
                  }
                  alt={banner.title}
                  fill
                  className="object-cover"
                  loading="eager"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8 text-white max-w-md">
                  <h1 className="text-4xl font-bold mb-2">{banner.title}</h1>
                  <p className="text-lg">{banner.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
