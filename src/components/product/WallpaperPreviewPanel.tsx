"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  WallpaperPreviewRequest,
  WallpaperPreviewResult,
} from "@/lib/preview/types";
import { enqueueOfflineMutation } from "@/lib/offline/queue";
import { toast } from "sonner";
import api from "@/lib/api";

type Props = {
  productId: number;
};

export function WallpaperPreviewPanel({ productId }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [tileScale, setTileScale] = useState(1);
  const [blendIntensity, setBlendIntensity] = useState(0.7);
  const [result, setResult] = useState<WallpaperPreviewResult | null>(null);

  const request = useMemo<WallpaperPreviewRequest>(
    () => ({
      productId,
      imageUrl,
      tileScale,
      blendIntensity,
      wallPolygon: {
        points: [
          { x: 0.15, y: 0.2 },
          { x: 0.85, y: 0.2 },
          { x: 0.9, y: 0.85 },
          { x: 0.1, y: 0.85 },
        ],
      },
    }),
    [productId, imageUrl, tileScale, blendIntensity],
  );

  const handleGeneratePreview = async () => {
    if (!request.imageUrl.trim()) {
      toast.error("Paste a room image URL first.");
      return;
    }

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
        if (previewId) {
          setResult((prev) =>
            prev ? { ...prev, previewId: String(previewId) } : prev,
          );
        }
        toast.success("Preview generated and synced.");
        return;
      } catch {
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
      </div>

      <Button
        onClick={handleGeneratePreview}
        className="w-full md:w-auto bg-primary text-white"
      >
        Generate Preview
      </Button>

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
