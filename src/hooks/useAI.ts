"use client";

import { useMutation } from "@tanstack/react-query";
import { aiClient } from "@/lib/ai/client";
import type {
  AssistantRequest,
  RecommendationsRequest,
  TranslateDraftRequest,
  VisualSearchRequest,
} from "@/lib/ai/types";

export function useRecommendations() {
  return useMutation({
    mutationFn: (payload: RecommendationsRequest) =>
      aiClient.recommendations(payload),
  });
}

export function useVisualSearch() {
  return useMutation({
    mutationFn: (payload: VisualSearchRequest) => aiClient.visualSearch(payload),
  });
}

export function useAssistant() {
  return useMutation({
    mutationFn: (payload: AssistantRequest) => aiClient.assistant(payload),
  });
}

export function useTranslateDraft() {
  return useMutation({
    mutationFn: (payload: TranslateDraftRequest) => aiClient.translateDraft(payload),
  });
}
