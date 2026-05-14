"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAssistant, useRecommendations } from "@/hooks/useAI";
import { useTranslations } from "next-intl";

type Props = {
  productId: number;
  productName: string;
};

export function ProductAIInsights({ productId, productName }: Props) {
  const t = useTranslations("assistant");
  const recommendations = useRecommendations();
  const assistant = useAssistant();
  const [message, setMessage] = useState(
    t('productAskPlaceholder', { productName }),
  );

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
      <h3 className="text-sm font-black uppercase tracking-wider">{t('aiInsights')}</h3>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase text-gray-500">
          {t('similarRecommendations')}
        </p>
        {recommendations.isPending && (
          <p className="text-sm text-gray-500">{t('loadingRecommendations')}</p>
        )}
        {recommendations.isError && (
          <p className="text-sm text-amber-600">
            {t('recommendationsUnavailable')}
          </p>
        )}
        {!!recommendations.data?.items.length && (
          <ul className="space-y-1 text-sm">
            {recommendations.data.items.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>Product #{item.productId}</span>
                <span className="text-gray-500">{item.score.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase text-gray-500">{t('askAssistantLabel')}</p>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          placeholder={t('productAskPlaceholder', { productName })}
        />
        <Button
          className="bg-primary text-white"
          onClick={() =>
            assistant.mutate({
              message,
              context: { productId, productName },
            })
          }
          disabled={assistant.isPending}
        >
          {assistant.isPending ? t('thinking') : t('ask')}
        </Button>

        {assistant.data?.reply && (
          <p className="rounded-xl bg-gray-50 p-3 text-sm">{assistant.data.reply}</p>
        )}
      </div>
    </section>
  );
}
