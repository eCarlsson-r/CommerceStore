import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { PWAProvider } from "@/components/pwa/PWAManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlsson Digital Commerce",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <PWAProvider>
              <CartProvider>
                <WishlistProvider>
                  <Header />
                  <main className="min-h-screen container mx-auto px-4">
                    {children}
                  </main>
                  <Footer />
                  <Toaster position="top-right" richColors />
                </WishlistProvider>
              </CartProvider>
            </PWAProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
