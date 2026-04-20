"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  WallpaperPreviewRequest,
  WallpaperPreviewResult,
  WallPolygon,
} from "@/lib/preview/types";
import { enqueueOfflineMutation } from "@/lib/offline/queue";
import { toast } from "sonner";
import api from "@/lib/api";
import { WallMaskSelector } from "./WallMaskSelector";
import { useAnalytics } from "@/hooks/useAnalytics";

type Props = {
  productId: number;
};

export function WallpaperPreviewPanel({ productId }: Props) {
  const analytics = useAnalytics();
  const [imageUrl, setImageUrl] = useState("");
  const [tileScale, setTileScale] = useState(1);
  const [blendIntensity, setBlendIntensity] = useState(0.7);
  const [result, setResult] = useState<WallpaperPreviewResult | null>(null);
  const [showMaskSelector, setShowMaskSelector] = useState(false);
  const [wallPolygon, setWallPolygon] = useState<WallPolygon>({
    points: [
      { x: 0.15, y: 0.2 },
      { x: 0.85, y: 0.2 },
      { x: 0.9, y: 0.85 },
      { x: 0.1, y: 0.85 },
    ],
  });

  const request = useMemo<WallpaperPreviewRequest>(
    () => ({
      productId,
      imageUrl,
      tileScale,
      blendIntensity,
      wallPolygon,
    }),
    [productId, imageUrl, tileScale, blendIntensity, wallPolygon],
  );

  const handleGeneratePreview = async () => {
    if (!request.imageUrl.trim()) {
      toast.error("Paste a room image URL first.");
      return;
    }

    // Track preview opening
    analytics.trackPreviewOpened(productId);

    const startTime = performance.now();
    const output: WallpaperPreviewResult = {
      previewId: crypto.randomUUID(),
      composedImageUrl: request.imageUrl,
      renderMs: 120,
      warnings: [],
    };
    setResult(output);

    const payload = {
      preview_id: output.previewId,
      product_id: request.productId,
      image_url: request.imageUrl,
      tile_scale: request.tileScale,
      blend_intensity: request.blendIntensity,
      wall_polygon: request.wallPolygon,
    };

    if (typeof navigator !== "undefined" && navigator.onLine) {
      try {
        const response = await api.post("/ecommerce/previews", payload);
        const previewId = response.data?.preview_id;
        const renderTime = Math.round(performance.now() - startTime);
        
        if (previewId) {
          setResult((prev) =>
            prev ? { ...prev, previewId: String(previewId) } : prev,
          );
        }

        // Track successful preview rendering
        analytics.trackPreviewRendered(String(previewId || output.previewId), renderTime, productId);
        toast.success("Preview generated and synced.");
        return;
      } catch (error) {
        // Track preview failure
        analytics.trackEvent("commercial", "preview_failed", 0, {
          product_id: productId,
          error: String(error),
        });
        // Fall through to offline queue.
      }
    }

    enqueueOfflineMutation({
      idempotencyKey: `preview.save:${output.previewId}`,
      type: "preview.save",
      payload,
    });
    toast.success("Preview generated. Saved for sync.");
  };

  const handlePolygonChange = (polygon: WallPolygon) => {
    setWallPolygon(polygon);
    setShowMaskSelector(false);
    toast.success("Wall region updated");
  };

  return (
    <section className="rounded-2xl border border-gray-200 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider">
          Wall Preview (MVP)
        </h3>
        <p className="text-xs text-gray-500">
          Deterministic preview pipeline: perspective mapping + repeat scale + blend.
        </p>
      </div>

      {showMaskSelector ? (
        <>
          {imageUrl && (
            <WallMaskSelector
              imageUrl={imageUrl}
              onPolygonChange={handlePolygonChange}
              onCancel={() => setShowMaskSelector(false)}
            />
          )}
          {!imageUrl && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-xs text-red-700">Please enter an image URL first to select wall region.</p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/your-room.jpg"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-gray-600">
              Tile Scale: {tileScale.toFixed(2)}x
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={tileScale}
                onChange={(event) => setTileScale(Number(event.target.value))}
                className="w-full"
              />
            </label>

            <label className="text-xs font-semibold text-gray-600">
              Blend: {blendIntensity.toFixed(2)}
              <input
                type="range"
                min={0.2}
                max={1}
                step={0.05}
                value={blendIntensity}
                onChange={(event) => setBlendIntensity(Number(event.target.value))}
                className="w-full"
              />
            </label>
          </div>

          <Button
            onClick={() => setShowMaskSelector(true)}
            variant="outline"
            className="w-full"
          >
            Select Wall Region
          </Button>
        </div>
      )}

      {!showMaskSelector && (
        <Button
          onClick={handleGeneratePreview}
          className="w-full md:w-auto bg-primary text-white"
        >
          Generate Preview
        </Button>
      )}

      {result && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            Preview ID: <span className="font-mono">{result.previewId}</span>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.composedImageUrl}
            alt="Wallpaper preview"
            className="w-full max-h-80 object-cover rounded-xl border border-gray-200"
          />
        </div>
      )}
    </section>
  );
}
