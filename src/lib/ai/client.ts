import api from "@/lib/api";
import type {
  AssistantRequest,
  AssistantResponse,
  RecommendationsRequest,
  RecommendationsResponse,
  TranslateDraftRequest,
  TranslateDraftResponse,
  VisualSearchRequest,
  VisualSearchResponse,
} from "@/lib/ai/types";

export const aiClient = {
  async recommendations(
    payload: RecommendationsRequest,
  ): Promise<RecommendationsResponse> {
    const { data } = await api.post<RecommendationsResponse>(
      "/ai/recommendations",
      payload,
    );
    return data;
  },

  async visualSearch(payload: VisualSearchRequest): Promise<VisualSearchResponse> {
    const { data } = await api.post<VisualSearchResponse>(
      "/ai/visual-search",
      payload,
    );
    return data;
  },

  async assistant(payload: AssistantRequest): Promise<AssistantResponse> {
    const { data } = await api.post<AssistantResponse>("/ai/assistant", payload);
    return data;
  },

  async translateDraft(
    payload: TranslateDraftRequest,
  ): Promise<TranslateDraftResponse> {
    const { data } = await api.post<TranslateDraftResponse>(
      "/ai/translate-draft",
      payload,
    );
    return data;
  },
};
