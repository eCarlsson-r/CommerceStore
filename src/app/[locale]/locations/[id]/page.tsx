"use client";
import { useBranch } from "@/hooks/useDataFetchers";
import { MapPin, Phone, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/product/ImageGallery";
import { useTranslations } from 'next-intl';

export default function BranchLocationPage() {
  const t = useTranslations('locations');
  const params = useParams();
  const branchId = params.id as string;
  const { data: branch, isLoading } = useBranch(branchId);

  const handleGetDirections = (branchName: string, address?: string) => {
    if (!address) return;
    // We encode the query to handle spaces and special characters safely
    const destination = encodeURIComponent(`${branchName}, ${address}`);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
  };

  if (isLoading) return <div className="p-20 text-center animate-pulse">{t('loading')}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-6">
            {branch?.name}
          </h1>
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="text-primary shrink-0" size={24} />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('address')}</p>
                <p className="text-sm font-bold uppercase">{branch?.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-primary shrink-0" size={24} />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('storeHours')}</p>
                <p className="text-sm font-bold uppercase">Daily: 10:00 AM — 10:00 PM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-primary shrink-0" size={24} />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{t('contact')}</p>
                <a href={`https://wa.me/${branch?.phone}`} className="text-sm font-bold hover:text-primary transition-colors">
                  {branch?.phone} (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          <Button onClick={() => branch && handleGetDirections(branch.name, branch.address)} className="mt-12 w-full md:w-auto px-12 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all">
            {t('getDirections')}
          </Button>
        </div>

        {/* This could be a static image of the mall or a Google Maps Embed */}
        <div className="bg-gray-100 rounded-[4rem] overflow-hidden relative">
          <ImageGallery items={branch?.media || []} mainImage={
              branch?.media?.[0]?.path
                ? branch?.media?.[0]?.path.startsWith("http")
                    ? branch?.media?.[0]?.path
                    : process.env.NEXT_PUBLIC_API_URL + branch?.media?.[0]?.path
                : "https://placehold.co/600x400/png"
              }
           />
        </div>
      </div>
    </div>
  );
}