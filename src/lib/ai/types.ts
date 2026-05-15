export type AIEndpoint =
  | "/ai/recommendations"
  | "/ai/visual-search"
  | "/ai/assistant"
  | "/ai/translate-draft";

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
  name: string;
  score: number;
  reason?: string;
  imageUrl?: string;
  price?: number;
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
  visualSearchMetadata?: {
    imageProcessed: boolean;
    inferredTags?: string[];
    confidence?: number;
  };
};

export type AssistantRequest = AIRequestMeta & {
  message: string;
  context?: Record<string, unknown>;
};

export type AssistantResponse = {
  reply: string;
  followUps?: string[];
  conversationId?: string;
  suggestedProducts?: RecommendationItem[];
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
  locales?: {
    source: string;
    target: string;
  };
  metadata?: {
    characterCount?: number;
    wordCount?: number;
    requiresReview?: boolean;
    isEmpty?: boolean;
  };
};

export type EditImageRequest = AIRequestMeta & {
  prompt: string;
  baseImageBase64: string;
  productImageBase64?: string;
};

export type EditImageResponse = {
  image_base64: string;
};

export type AIKPIEvent =
  | "ai_recommendations_served"
  | "ai_visual_search_used"
  | "ai_assistant_resolved"
  | "ai_translation_drafted";
