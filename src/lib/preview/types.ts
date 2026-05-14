export type Point2D = {
  x: number;
  y: number;
};

export type WallPolygon = {
  points: Point2D[];
};

export type WallpaperPreviewRequest = {
  productId: number;
  imageUrl: string;
  wallPolygon: WallPolygon;
  tileScale: number;
  blendIntensity: number;
};

export type WallpaperPreviewResult = {
  previewId: string;
  composedImageUrl: string;
  renderMs: number;
  warnings: string[];
};

export type PreviewKPIEvent =
  | "preview_opened"
  | "preview_rendered"
  | "preview_failed"
  | "preview_added_to_cart";
