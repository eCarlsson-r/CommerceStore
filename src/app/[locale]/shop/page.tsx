import { getProducts, getCategories } from "@/lib/data-fetchers";
import Sidebar from "@/components/Sidebar";
import { ShopResultsClient } from "@/components/shop/ShopResultsClient";
import enMessages from '../../../../messages/en.json';
import idMessages from '../../../../messages/id.json';

const messagesByLocale: Record<string, any> = {
  en: enMessages,
  id: idMessages,
};

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; min_price?: string; max_price?: string }>;
}) {
  const { locale } = await params;
  const messages = messagesByLocale[locale] || enMessages;
  const t = (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
  const sparams = await searchParams;
  
  const products = await getProducts(sparams);
  const categories = await getCategories();

  const priceBounds = {
    min: products.min_price,
    max: products.max_price,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 my-10">
      <Sidebar categories={categories} priceBounds={priceBounds} />

      <main className="flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            {sparams.category || t('product.ourCollection')}
          </h1>
        </header>

        <ShopResultsClient initialProducts={products.products} />
      </main>
    </div>
  );
}
