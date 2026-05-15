import { ReactNode } from 'react';
import { I18nProvider } from '@/components/providers/I18nProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { PWAProvider } from '@/components/pwa/PWAManager';
import OfflineSyncManager from '@/components/offline/OfflineSyncManager';
import { FloatingAssistantWidget } from '@/components/ai/FloatingAssistantWidget';
import enMessages from '../../../messages/en.json';
import idMessages from '../../../messages/id.json';

const messagesByLocale: Record<string, typeof enMessages> = {
  en: enMessages,
  id: idMessages,
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = messagesByLocale[locale] || enMessages;

  return (
    <I18nProvider locale={locale} messages={messages}>
      <QueryProvider>
        <AuthProvider>
          <PWAProvider>
            <CartProvider>
              <WishlistProvider>
                <OfflineSyncManager />
                <Header />
                <main className="min-h-screen container mx-auto px-4">
                  {children}
                </main>
                <Footer />
                <Toaster position="top-right" richColors />
                <FloatingAssistantWidget />
              </WishlistProvider>
            </CartProvider>
          </PWAProvider>
        </AuthProvider>
      </QueryProvider>
    </I18nProvider>
  );
}
