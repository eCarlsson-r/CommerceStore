"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecommendations } from "@/hooks/useAI";
import { useTranslations } from "next-intl";

type Props = {
  productId: number;
};

export function ProductAIInsights({ productId }: Props) {
  const t = useTranslations("assistant");
  const recommendations = useRecommendations();

  useEffect(() => {
    recommendations.mutate({
      productId,
      maxResults: 4,
      contextTags: ["pdp", "cross_sell"],
    });
    // Run once per product load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <section className="space-y-4 rounded-2xl border border-gray-200 p-5">
      <h3 className="text-sm font-black uppercase tracking-wider">{t('similarRecommendations')}</h3>

      {recommendations.isPending && (
          <p className="text-sm text-gray-500">{t('loadingRecommendations')}</p>
      )}
      {recommendations.isError && (
        <p className="text-sm text-amber-600">
          {t('recommendationsUnavailable')}
        </p>
      )}
      {!!recommendations.data?.items.length && (
        <div className={`grid gap-3 ${recommendations.data.items.length > 3 ? 'grid-cols-4 overflow-x-auto' : 'grid-cols-3'}`}>
          {recommendations.data.items.filter((item) => item.productId !== productId).map((item) => (
            <Link href={`/product/${item.productId}`} key={item.productId} className="flex flex-col gap-2 rounded-xl border border-gray-100 p-2 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden relative">
                <Image
                  src={
                    item.imageUrl
                      ? item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : process.env.NEXT_PUBLIC_API_URL + item.imageUrl
                      : `https://placehold.co/200x200/f1f5f9/64748b?text=${encodeURIComponent(item.name || 'Product')}`
                  }
                  alt={item.name || `Product #${item.productId}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-primary text-[9px] px-1.5 py-0.5 rounded-full font-black border border-primary/10 shadow-sm">
                  {t('matchScore', { match: (item.score * 100).toFixed(0) })}
                </div>
              </div>
              <div className="px-1 pb-1">
                <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name || `Product #${item.productId}`}</h4>
                <p className="text-xs text-primary font-black mt-0.5">
                  {item.price !== undefined && item.price !== null
                    ? Number(item.price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0
                    })
                    : "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
