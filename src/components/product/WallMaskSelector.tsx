"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { WallPolygon, Point2D } from "@/lib/preview/types";

type Props = {
  imageUrl: string;
  onPolygonChange: (polygon: WallPolygon) => void;
  onCancel: () => void;
};

export function WallMaskSelector({ imageUrl, onPolygonChange, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point2D[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 1, height: 1 });

  // Load image and set canvas size
  useEffect(() => {
    if (!imageUrl.trim() || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      setImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scale canvas to fit container while maintaining aspect ratio
      const maxWidth = canvas.parentElement?.clientWidth || 600;
      const maxHeight = Math.min(500, (img.naturalHeight / img.naturalWidth) * maxWidth);
      
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      setImageLoaded(true);
      redraw(img, maxWidth, maxHeight, points);
    };

    img.onerror = () => {
      console.error("Failed to load image for wall selection");
    };

    img.src = imageUrl;
  }, [imageUrl]);

  // Redraw canvas with image and points
  const redraw = (
    img: CanvasImageSource,
    canvasWidth: number,
    canvasHeight: number,
    currentPoints: Point2D[],
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw image
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    // Draw semi-transparent overlay outside polygon (if points exist)
    if (currentPoints.length > 0) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw polygon (clear area)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.beginPath();
      currentPoints.forEach((point, idx) => {
        const x = point.x * canvasWidth;
        const y = point.y * canvasHeight;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    // Draw polygon outline
    if (currentPoints.length > 0) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      currentPoints.forEach((point, idx) => {
        const x = point.x * canvasWidth;
        const y = point.y * canvasHeight;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    }

    // Draw points
    currentPoints.forEach((point) => {
      const x = point.x * canvasWidth;
      const y = point.y * canvasHeight;
      
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw preview line from last point to cursor (if hovering)
    if (currentPoints.length > 0 && currentPoints.length < 4) {
      ctx.strokeStyle = "#93c5fd";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      const lastPoint = currentPoints[currentPoints.length - 1];
      ctx.moveTo(lastPoint.x * canvasWidth, lastPoint.y * canvasHeight);
      ctx.lineTo(0, 0); // Will be updated on mousemove
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || points.length >= 4) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const newPoints = [...points, { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }];
    setPoints(newPoints);

    // Redraw with new point
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      redraw(img, canvasRef.current!.width, canvasRef.current!.height, newPoints);
    };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || points.length === 0 || points.length >= 4) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update preview line
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const ctx = canvasRef.current!.getContext("2d");
      if (!ctx) return;

      redraw(img, canvasRef.current!.width, canvasRef.current!.height, points);

      // Draw preview line
      if (points.length > 0) {
        ctx.strokeStyle = "#93c5fd";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const lastPoint = points[points.length - 1];
        ctx.moveTo(lastPoint.x * canvasRef.current!.width, lastPoint.y * canvasRef.current!.height);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };
  };

  const handleConfirm = () => {
    if (points.length < 3) {
      alert("Please select at least 3 points to define the wall region.");
      return;
    }

    onPolygonChange({ points });
  };

  const handleReset = () => {
    setPoints([]);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      redraw(img, canvasRef.current!.width, canvasRef.current!.height, []);
    };
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs font-semibold text-amber-900">Click on the image to select the wall region</p>
        <p className="text-xs text-amber-700">Click at least 3 points to form a polygon around your wall.</p>
      </div>

      {imageLoaded && (
        <>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            className="w-full border-2 border-dashed border-blue-300 rounded-lg cursor-crosshair bg-gray-100"
          />

          <div className="text-xs text-gray-600">
            Points selected: {points.length}/4
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConfirm}
              disabled={points.length < 3}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm Selection ({points.length})
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              disabled={points.length === 0}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              onClick={onCancel}
              variant="ghost"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      {!imageLoaded && imageUrl.trim() && (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Loading image...</p>
        </div>
      )}
    </div>
  );
}
