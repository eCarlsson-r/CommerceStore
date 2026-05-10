export type AIEndpoint =
  | "/ai/recommendations"
  | "/ai/visual-search"
  | "/ai/assistant"
  | "/ai/translate-draft"
  | "/ai/edit-image";

export type AIRequestMeta = {
  locale?: string;
  sessionId?: string;
  customerId?: number;
};

export type RecommendationsRequest = AIRequestMeta & {
  productId?: number;
  contextTags?: string[];
  maxResults?: number;
};

export type RecommendationItem = {
  productId: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  score: number;
  reason?: string;
};

export type RecommendationsResponse = {
  items: RecommendationItem[];
};

export type VisualSearchRequest = AIRequestMeta & {
  imageUrl: string;
  maxResults?: number;
};

export type VisualSearchResponse = {
  items: RecommendationItem[];
};

export type AssistantRequest = AIRequestMeta & {
  message: string;
  context?: Record<string, unknown>;
};

export type AssistantResponse = {
  reply: string;
  followUps?: string[];
};

export type TranslateDraftRequest = AIRequestMeta & {
  sourceLocale: string;
  targetLocale: string;
  text: string;
  glossary?: string[];
};

export type TranslateDraftResponse = {
  translatedText: string;
  qualityHint?: "draft" | "review_needed";
};

export type EditImageRequest = AIRequestMeta & {
  prompt: string;
  baseImageBase64: string;
  maskImageBase64?: string;
};

export type EditImageResponse = {
  image_base64: string;
};

export type AIKPIEvent =
  | "ai_recommendations_served"
  | "ai_visual_search_used"
  | "ai_assistant_resolved"
  | "ai_translation_drafted"
  | "ai_image_edited";
