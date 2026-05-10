"use client";
import { useState, useRef } from "react";
import { useEditImage } from "@/hooks/useAI";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Ruler, LayoutGrid, Box } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editImage = useEditImage();

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

  const generateAIPreview = () => {
    if (!roomImage) return;
    editImage.mutate({
      prompt: `Apply ${productName} wallpaper to the walls in this room, preserving furniture and lighting`,
      baseImageBase64: roomImage.split(",")[1],
    }, {
      onSuccess: (data) => {
        setPreviewImage(`data:image/png;base64,${data.image_base64}`);
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
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">3D Interactive Preview</h2>
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
            3D Room
          </button>
          <button 
            onClick={() => setViewMode('upload')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all flex items-center gap-1.5",
              viewMode === 'upload' ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Camera className="w-3 h-3" />
            AI In-Situ
          </button>
        </div>
      </div>

      {viewMode === 'dimensions' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">Width (m)</label>
              <input 
                type="number" 
                value={wallWidth} 
                onChange={(e) => setWallWidth(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">Height (m)</label>
              <input 
                type="number" 
                value={wallHeight} 
                onChange={(e) => setWallHeight(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-tight text-gray-400">Depth (m)</label>
              <input 
                type="number" 
                value={wallDepth} 
                onChange={(e) => setWallDepth(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none ring-primary/10"
              />
            </div>
          </div>

          {/* 3D Scene Container */}
          <div className="relative aspect-16/10 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: '1200px' }}
            >
              <div 
                className="relative transition-all duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(-15deg) rotateY(-35deg) translateZ(0px)',
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
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase text-gray-600">Dynamic 3D Corner</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="w-3 h-3 text-primary" />
              <p className="text-[10px] font-black text-primary uppercase">Volume Calculation</p>
            </div>
            <p className="text-[9px] text-gray-600">
              For this {wallWidth}m x {wallHeight}m room layout, you need 
              <span className="font-bold text-primary mx-1">
                {Math.ceil(((wallWidth + wallDepth) * wallHeight) / 5)} rolls
              </span> 
              to cover both visible walls.
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
              <p className="text-xs font-bold text-gray-400 group-hover:text-gray-600">Upload your room photo</p>
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
                  alt="Room preview" 
                  fill 
                  className="object-cover"
                />
                {editImage.isPending && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Applying Wallpaper...</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-primary text-white py-6 rounded-xl font-black uppercase text-[10px]"
                  onClick={generateAIPreview}
                  disabled={editImage.isPending}
                >
                  {previewImage ? 'Try Different Style' : 'Generate AI In-Situ'}
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-6 rounded-xl font-black uppercase text-[10px]"
                  onClick={() => { setRoomImage(null); setPreviewImage(null); }}
                  disabled={editImage.isPending}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
