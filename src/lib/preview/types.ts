export type RoomWall = "front" | "back" | "left" | "right" | "all";

export type RoomDimensions = {
  width: number;  // meters
  height: number; // meters
  depth: number;  // meters
};

export type WallpaperPreviewRequest = {
  productId: number;
  productImage: string;
  roomDimensions: RoomDimensions;
  selectedWall: RoomWall;
  tileScale: number;
  patternRepeat?: number; // cm
};

export type WallpaperPreviewResult = {
  previewId: string;
  roomPreviewUrl: string;
  wallCoverage: {
    wall: RoomWall;
    width: number;  // meters covered
    height: number; // meters covered
    rollsNeeded: number;
  }[];
  renderMs: number;
  warnings: string[];
};

export type PreviewKPIEvent =
  | "preview_opened"
  | "preview_rendered"
  | "preview_failed"
  | "preview_added_to_cart";
