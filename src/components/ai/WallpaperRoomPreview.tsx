"use client";
import { useState, useRef } from "react";
import { useEditImage } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Ruler, LayoutGrid, Box } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function WallpaperRoomPreview({ 
  productName,
  productImage 
}: { 
  productName: string,
  productImage?: string 
}) {
  const [viewMode, setViewMode] = useState<'upload' | 'dimensions'>('dimensions');
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Dimensions state (in meters)
  const [wallWidth, setWallWidth] = useState<number>(3.5);
  const [wallHeight, setWallHeight] = useState<number>(2.4);
  const [wallDepth, setWallDepth] = useState<number>(2.5);

  // Rotation state
  const [rotation, setRotation] = useState({ x: -15, y: -35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editImage = useEditImage();
  const t = useTranslations("assistant");

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => setIsDragging(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setRoomImage(event.target?.result as string);
      setPreviewImage(null);
    };
    reader.readAsDataURL(file);
  };

  /** Converts an image URL to a base64 string (data stripped). Returns null on failure. */
  const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      console.warn("⚠️ Could not fetch product image as base64:", url);
      return null;
    }
  };

  const generateAIPreview = async () => {
    if (!roomImage) return;

    // Fetch the actual wallpaper pattern so the model uses the real texture,
    // not just the product name from the prompt.
    const productImageBase64 = productImage
      ? await fetchImageAsBase64(productImage)
      : null;

    editImage.mutate({
      prompt: productImageBase64
        ? `Apply the wallpaper pattern shown in the style reference image to all walls in this room. Preserve all furniture, floors, and lighting exactly as they are.`
        : `Apply ${productName} wallpaper pattern to the walls in this room, preserving furniture and lighting`,
      baseImageBase64: roomImage.split(",")[1],
      ...(productImageBase64 ? { productImageBase64 } : {}),
    }, {
      onSuccess: (data) => {
        console.info('✅ AI Edit Success:', data);
        if (data.image_base64) {
          setPreviewImage(`data:image/png;base64,${data.image_base64}`);
        } else {
          console.error('❌ No image_base64 in response');
        }
      },
      onError: (error) => {
        console.error('❌ AI Edit Error:', error);
      }
    });
  };

  // 3D Scale Factor (px per meter)
  const pxPerMeter = 60;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Box className="text-primary w-5 h-5" />
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">{t('volumeCalculation')}</h2>
        </div>
        
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button 
            onClick={() => setViewMode('dimensions')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all flex items-center gap-1.5",
              viewMode === 'dimensions' ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Ruler className="w-3 h-3" />
            {t('dimensionsMode')}
          </button>
          <button 
            onClick={() => setViewMode('upload')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all flex items-center gap-1.5",
              viewMode === 'upload' ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Camera className="w-3 h-3" />
            {t('aiInSituMode')}
          </button>
        </div>
      </div>

      {viewMode === 'dimensions' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">{t('widthMeters')}</label>
              <input 
                type="number" 
                value={wallWidth} 
                onChange={(e) => setWallWidth(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">{t('heightMeters')}</label>
              <input 
                type="number" 
                value={wallHeight} 
                onChange={(e) => setWallHeight(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">{t('depthMeters')}</label>
              <input 
                type="number" 
                value={wallDepth} 
                onChange={(e) => setWallDepth(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
          </div>

          {/* 3D Scene Container */}
          <div 
            className={cn(
              "relative aspect-16/10 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-200 transition-all",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleDragEnd}
          >
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              <div 
                className="relative transition-all duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${wallDepth * pxPerMeter / 2}px)`,
                  width: `${wallWidth * pxPerMeter}px`,
                  height: `${wallHeight * pxPerMeter}px`
                }}
              >
                {/* Back Wall */}
                <div 
                  className="absolute inset-0 bg-white border border-gray-200/50 shadow-2xl"
                  style={{
                    backgroundImage: `url(${productImage})`,
                    backgroundSize: '80px',
                    backgroundRepeat: 'repeat',
                    transform: `translateZ(${-wallDepth * pxPerMeter}px)`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Left Wall */}
                <div 
                  className="absolute inset-y-0 left-0 bg-white border border-gray-200/50"
                  style={{
                    width: `${wallDepth * pxPerMeter}px`,
                    backgroundImage: `url(${productImage})`,
                    backgroundSize: '80px',
                    backgroundRepeat: 'repeat',
                    transformOrigin: 'left',
                    transform: `rotateY(90deg)`
                  }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Floor */}
                <div 
                  className="absolute inset-x-0 bottom-0 bg-gray-200 border border-gray-300"
                  style={{
                    height: `${wallDepth * pxPerMeter}px`,
                    transformOrigin: 'bottom',
                    transform: `rotateX(90deg)`,
                    backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #e2e8f0 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent" />
                </div>

                {/* Ambient Shadow in the corner */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: 'inset 40px 0 60px rgba(0,0,0,0.1)',
                    transform: `translateZ(${-wallDepth * pxPerMeter + 1}px)`
                  }}
                />
              </div>
            </div>

            {/* Interaction Tooltip */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", isDragging ? "bg-primary animate-ping" : "bg-green-500 animate-pulse")} />
                <span className="text-[9px] font-black uppercase text-gray-600">
                  {isDragging ? t('rotating') : t('clickDragToRotate')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="w-3 h-3 text-primary" />
              <p className="text-[10px] font-black text-primary uppercase">{t('volumeCalculation')}</p>
            </div>
            <p className="text-[9px] text-gray-600">
              {t('volumeResult', {
                width: wallWidth,
                height: wallHeight,
                depth: wallDepth,
                rolls: Math.ceil(((wallWidth + wallDepth) * wallHeight) / 5),
              })}
            </p>
          </div>
        </div>
      ) : (
        /* AI In-Situ Mode */
        <div>
          {!roomImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all group"
            >
              <Camera className="w-10 h-10 text-gray-300 group-hover:text-primary mb-3" />
              <p className="text-xs font-bold text-gray-400 group-hover:text-gray-600">{t('uploadYourRoomPhoto')}</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleUpload} 
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-inner">
                <Image 
                  src={previewImage || roomImage} 
                  alt={t('roomPreviewAlt')} 
                  fill 
                  className="object-cover"
                />
                {editImage.isPending && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest">{t('applyingWallpaper')}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-primary text-white py-6 rounded-xl font-black uppercase text-[10px]"
                  onClick={generateAIPreview}
                  disabled={editImage.isPending}
                >
                  {previewImage ? t('tryDifferentStyle') : t('generateAIPreview')}
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-6 rounded-xl font-black uppercase text-[10px]"
                  onClick={() => { setRoomImage(null); setPreviewImage(null); }}
                  disabled={editImage.isPending}
                >
                  {t('reset')}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
