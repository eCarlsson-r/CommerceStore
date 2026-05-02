"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type {
  WallpaperPreviewRequest,
  WallpaperPreviewResult,
  RoomDimensions,
  RoomWall,
} from "@/lib/preview/types";
import { enqueueOfflineMutation } from "@/lib/offline/queue";
import { previewSessionDB } from "@/lib/offline/indexeddb";
import { toast } from "sonner";
import api from "@/lib/api";
import { ShoppingBag, Maximize, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import analytics from "@/lib/analytics/client";

const WALL_ICONS: Record<RoomWall, React.ReactNode> = {
  front: <ArrowUp size={18} />,
  back: <ArrowDown size={18} />,
  left: <ArrowLeft size={18} />,
  right: <ArrowRight size={18} />,
  all: <LayoutGrid size={18} />,
};

const WALL_LABELS: Record<RoomWall, string> = {
  front: "Front Wall",
  back: "Back Wall",
  left: "Left Wall",
  right: "Right Wall",
  all: "All Walls",
};

type Props = {
  productId: number;
  productImage: string;
  onAttachToCart?: (previewId: string, previewUrl: string) => void;
};

export function WallpaperPreviewPanel({ productId, productImage, onAttachToCart }: Props) {
  const [roomDimensions, setRoomDimensions] = useState<RoomDimensions>({
    width: 4,
    height: 2.8,
    depth: 3.5,
  });
  const [selectedWall, setSelectedWall] = useState<RoomWall>("front");
  const [tileScale, setTileScale] = useState(1);
  const [patternRepeat, setPatternRepeat] = useState(53);
  const [result, setResult] = useState<WallpaperPreviewResult | null>(null);
  const [isAttaching, setIsAttaching] = useState(false);
  const [hasTrackedOpen, setHasTrackedOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  if (!hasTrackedOpen) {
    analytics.trackPreviewOpened(productId);
    setHasTrackedOpen(true);
  }

  const request = useMemo<WallpaperPreviewRequest>(
    () => ({
      productId,
      productImage,
      roomDimensions,
      selectedWall,
      tileScale,
      patternRepeat,
    }),
    [productId, productImage, roomDimensions, selectedWall, tileScale, patternRepeat],
  );

  const calculateRollsNeeded = (wallWidth: number, wallHeight: number): number => {
    const wallpaperWidth = 0.53;
    const stripsNeeded = Math.ceil(wallWidth / wallpaperWidth);
    const stripLength = wallHeight + 0.1;
    const patternRepeatM = patternRepeat / 100;
    const effectiveStripLength = Math.ceil(stripLength / patternRepeatM) * patternRepeatM;
    const rollLength = 10;
    const stripsPerRoll = Math.floor(rollLength / effectiveStripLength);
    return Math.ceil(stripsNeeded / Math.max(stripsPerRoll, 1));
  };

  const getWallDimensions = (wall: RoomWall): { width: number; height: number } => {
    if (wall === "left" || wall === "right") {
      return { width: roomDimensions.depth, height: roomDimensions.height };
    }
    if (wall === "front" || wall === "back") {
      return { width: roomDimensions.width, height: roomDimensions.height };
    }
    return { width: roomDimensions.width, height: roomDimensions.height };
  };

  const handleGeneratePreview = async () => {
    const startTime = performance.now();

    const coverage = selectedWall === "all"
      ? (["front", "back", "left", "right"] as RoomWall[]).map((wall) => {
          const dims = getWallDimensions(wall);
          return {
            wall,
            width: dims.width,
            height: dims.height,
            rollsNeeded: calculateRollsNeeded(dims.width, dims.height),
          };
        })
      : [{
          wall: selectedWall,
          ...getWallDimensions(selectedWall),
          rollsNeeded: calculateRollsNeeded(getWallDimensions(selectedWall).width, getWallDimensions(selectedWall).height),
        }];

    const totalRolls = coverage.reduce((sum, c) => sum + c.rollsNeeded, 0);

    const previewId = crypto.randomUUID();
    
    // Build Pollinations.ai URL directly (avoid backend redirect issues)
    const wallDescriptions: Record<RoomWall, string> = {
      front: 'front wall',
      back: 'back wall',
      left: 'left wall',
      right: 'right wall',
      all: 'all four walls',
    };
    const wallDesc = wallDescriptions[selectedWall];
    const roomSize = `${roomDimensions.width}m x ${roomDimensions.depth}m room with ${roomDimensions.height}m ceiling height`;
    const prompt = encodeURIComponent(`Professional interior design photography of a ${roomSize}, ${wallDesc} covered with decorative wallpaper. Modern living space with natural lighting, neutral furniture, warm ambient light, photorealistic, 8k quality, architectural visualization, floor lamp, sofa, minimal decor`);
    const seed = previewId.split('-')[0]; // Use first part of UUID as seed
    const roomPreviewUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&seed=${seed}&nologo=true&negative_prompt=blurry,low quality, distorted, ugly, deformed`;

    const output: WallpaperPreviewResult = {
      previewId,
      roomPreviewUrl,
      wallCoverage: coverage,
      renderMs: Math.round(performance.now() - startTime),
      warnings: totalRolls > 10 ? ["Large area - consider professional installation"] : [],
    };
    setResult(output);

    await previewSessionDB.save({
      previewId: output.previewId,
      productId: request.productId,
      productImage: request.productImage,
      roomDimensions: request.roomDimensions,
      selectedWall: request.selectedWall,
      tileScale: request.tileScale,
      patternRepeat: request.patternRepeat,
      roomPreviewUrl: output.roomPreviewUrl,
      wallCoverage: output.wallCoverage,
      createdAt: new Date().toISOString(),
    });

    analytics.trackPreviewRendered(output.previewId, output.renderMs, productId);

    const payload = {
      preview_id: output.previewId,
      product_id: request.productId,
      room_dimensions: request.roomDimensions,
      selected_wall: request.selectedWall,
      tile_scale: request.tileScale,
      pattern_repeat: request.patternRepeat,
      wall_coverage: output.wallCoverage.map(c => ({
        wall: c.wall,
        width: c.width,
        height: c.height,
        rolls_needed: c.rollsNeeded,
      })),
      room_preview_url: output.roomPreviewUrl,
    };

    if (typeof navigator !== "undefined" && navigator.onLine) {
      try {
        await api.post("/ecommerce/previews", payload);
        toast.success(`Preview generated! ${totalRolls} rolls needed.`);
      } catch {
        enqueueOfflineMutation({
          idempotencyKey: `preview.save:${output.previewId}`,
          type: "preview.save",
          payload,
        });
        toast.success(`Preview generated! ${totalRolls} rolls needed. (Saved offline)`);
      }
    } else {
      enqueueOfflineMutation({
        idempotencyKey: `preview.save:${output.previewId}`,
        type: "preview.save",
        payload,
      });
      toast.success(`Preview generated! ${totalRolls} rolls needed. (Saved offline)`);
    }
  };

  const handleAttachToCart = async () => {
    if (!result) return;

    setIsAttaching(true);
    analytics.trackPreviewAttachedToCart(result.previewId, productId);

    const payload = {
      preview_id: result.previewId,
      product_id: productId,
      preview_url: result.roomPreviewUrl,
      wall_coverage: result.wallCoverage,
    };

    onAttachToCart?.(result.previewId, result.roomPreviewUrl);

    if (typeof navigator !== "undefined" && navigator.onLine) {
      try {
        await api.post("/ecommerce/previews/attach", payload);
        toast.success("Preview attached to cart!");
      } catch {
        enqueueOfflineMutation({
          idempotencyKey: `preview.attach_to_cart:${result.previewId}`,
          type: "preview.attach_to_cart",
          payload,
        });
        toast.success("Preview will be attached when online.");
      }
    } else {
      enqueueOfflineMutation({
        idempotencyKey: `preview.attach_to_cart:${result.previewId}`,
        type: "preview.attach_to_cart",
        payload,
      });
      toast.success("Preview will be attached when online.");
    }

    setIsAttaching(false);
  };

  return (
    <section className="rounded-2xl border border-gray-200 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
          <Maximize size={16} />
          Room Preview
        </h3>
        <p className="text-xs text-gray-500">
          Enter your room dimensions and select which wall to preview.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-700 uppercase">Room Dimensions (meters)</h4>
        <div className="grid grid-cols-3 gap-3">
          <label className="space-y-1">
            <span className="text-[10px] font-medium text-gray-500">Width</span>
            <input
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={roomDimensions.width}
              onChange={(e) => setRoomDimensions((prev) => ({ ...prev, width: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-medium text-gray-500">Height</span>
            <input
              type="number"
              min={1}
              max={10}
              step={0.1}
              value={roomDimensions.height}
              onChange={(e) => setRoomDimensions((prev) => ({ ...prev, height: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-medium text-gray-500">Depth</span>
            <input
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={roomDimensions.depth}
              onChange={(e) => setRoomDimensions((prev) => ({ ...prev, depth: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-700 uppercase">Select Wall</h4>
        <div className="grid grid-cols-5 gap-2">
          {(["front", "back", "left", "right", "all"] as RoomWall[]).map((wall) => (
            <button
              key={wall}
              onClick={() => setSelectedWall(wall)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                selectedWall === wall
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {WALL_ICONS[wall]}
              <span className="text-[9px] font-medium">{WALL_LABELS[wall]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-gray-700 uppercase">Wallpaper Settings</h4>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-[10px] font-medium text-gray-500">Pattern Scale: {tileScale.toFixed(2)}x</span>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.05}
              value={tileScale}
              onChange={(e) => setTileScale(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[10px] font-medium text-gray-500">Pattern Repeat: {patternRepeat}cm</span>
            <input
              type="number"
              min={0}
              max={200}
              step={1}
              value={patternRepeat}
              onChange={(e) => setPatternRepeat(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleGeneratePreview} className="flex-1 bg-primary text-white">
          Generate Room Preview
        </Button>

        {result && onAttachToCart && (
          <Button
            onClick={handleAttachToCart}
            disabled={isAttaching}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            {isAttaching ? "Attaching..." : "Add to Cart"}
          </Button>
        )}
      </div>

      {result && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-xs text-gray-500">
              Preview ID: <span className="font-mono">{result.previewId.slice(0, 8)}</span>
            </p>
            <p className="text-xs text-gray-400">{result.renderMs}ms</p>
          </div>

          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-xs text-gray-500">Generating preview...</p>
                  <p className="text-[10px] text-gray-400 mt-1">This may take 5-15 seconds</p>
                </div>
              </div>
            )}
            {imageError && retryCount < 3 ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <button
                  onClick={() => {
                    setImageError(false);
                    setImageLoading(true);
                    setRetryCount(c => c + 1);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90"
                >
                  Retry Loading Image
                </button>
              </div>
            ) : imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-center p-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Image generation failed</p>
                  <a
                    href={result.roomPreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm underline hover:no-underline"
                  >
                    Open image in new tab
                  </a>
                </div>
              </div>
            ) : (
              <img
                src={`${result.roomPreviewUrl}&retry=${retryCount}`}
                alt="Room preview"
                className="w-full h-full object-cover"
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <h5 className="text-xs font-semibold uppercase text-gray-700">Coverage Summary</h5>
            {result.wallCoverage.map((coverage) => (
              <div key={coverage.wall} className="flex justify-between text-sm">
                <span className="text-gray-600">{WALL_LABELS[coverage.wall]}</span>
                <span className="font-medium">
                  {coverage.width.toFixed(1)}m × {coverage.height.toFixed(1)}m
                  <span className="text-primary ml-2">({coverage.rollsNeeded} rolls)</span>
                </span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total Rolls Needed</span>
                <span className="text-primary text-lg">
                  {result.wallCoverage.reduce((sum, c) => sum + c.rollsNeeded, 0)}
                </span>
              </div>
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="bg-yellow-50 text-yellow-700 text-xs p-2 rounded-lg">
              ⚠️ {result.warnings[0]}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
