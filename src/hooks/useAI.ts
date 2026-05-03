"use client";

import { useMutation } from "@tanstack/react-query";
import { aiClient } from "@/lib/ai/client";
import analytics from "@/lib/analytics/client";
import type {
  AssistantRequest,
  RecommendationsRequest,
  TranslateDraftRequest,
  VisualSearchRequest,
  EditImageRequest,
} from "@/lib/ai/types";

export function useRecommendations() {
  return useMutation({
    mutationFn: async (payload: RecommendationsRequest) => {
      const startTime = performance.now();
      const result = await aiClient.recommendations(payload);
      const latencyMs = Math.round(performance.now() - startTime);

      // Track KPIs
      analytics.trackAIRecommendationsServed(result.items.length, {
        productId: payload.productId,
        contextTags: payload.contextTags,
      });
      analytics.trackAILatency("recommendations", latencyMs);

      return result;
    },
  });
}

export function useVisualSearch() {
  return useMutation({
    mutationFn: async (payload: VisualSearchRequest) => {
      const startTime = performance.now();
      const result = await aiClient.visualSearch(payload);
      const latencyMs = Math.round(performance.now() - startTime);

      // Track KPIs
      analytics.trackVisualSearchUsed(result.items.length, {
        imageUrl: payload.imageUrl.substring(0, 100),
      });
      analytics.trackAILatency("visual_search", latencyMs);

      return result;
    },
  });
}

export function useAssistant() {
  return useMutation({
    mutationFn: async (payload: AssistantRequest) => {
      const startTime = performance.now();
      const result = await aiClient.assistant(payload);
      const latencyMs = Math.round(performance.now() - startTime);

      // Track KPIs
      analytics.trackAssistantResolution(true, payload.context?.topic as string);
      analytics.trackAILatency("assistant", latencyMs);

      return result;
    },
  });
}

export function useTranslateDraft() {
  return useMutation({
    mutationFn: async (payload: TranslateDraftRequest) => {
      const startTime = performance.now();
      const result = await aiClient.translateDraft(payload);
      const latencyMs = Math.round(performance.now() - startTime);

      // Track KPIs
      analytics.trackEvent("commercial", "ai_translation_drafted", 1, {
        sourceLocale: payload.sourceLocale,
        targetLocale: payload.targetLocale,
        qualityHint: result.qualityHint,
      });
      analytics.trackAILatency("translate", latencyMs);

      return result;
    },
  });
}

export function useEditImage() {
  return useMutation({
    mutationFn: async (payload: EditImageRequest) => {
      const startTime = performance.now();
      const result = await aiClient.editImage(payload);
      const latencyMs = Math.round(performance.now() - startTime);

      // Track KPIs
      analytics.trackEvent("commercial", "ai_image_edited", 1, {
        prompt: payload.prompt.substring(0, 50),
      });
      analytics.trackAILatency("edit_image", latencyMs);

      return result;
    },
  });
}
