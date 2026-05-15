import { getProducts, getCategories } from "@/lib/data-fetchers";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import enMessages from '../../../../messages/en.json';
import idMessages from '../../../../messages/id.json';

const messagesByLocale = {
  en: enMessages,
  id: idMessages,
} as const;

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; min_price?: string; max_price?: string }>;
}) {
  const { locale } = await params;
  const messages = messagesByLocale[locale as keyof typeof messagesByLocale] || enMessages;
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      if (typeof value !== 'object' || value === null) {
        return key;
      }
      value = (value as Record<string, unknown>)[k];
    }
    return typeof value === 'string' ? value : key;
  };
  const sparams = await searchParams;
  
  const products = await getProducts(sparams);
  const categories = await getCategories();

  const priceBounds = {
    min: products.min_price,
    max: products.max_price,
  };

  return (
    <ShopPageClient
      categories={categories}
      priceBounds={priceBounds}
      initialProducts={products.products}
      categoryName={sparams.category || t('product.ourCollection')}
    />
  );
}
