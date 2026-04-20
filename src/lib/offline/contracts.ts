export type OfflineEntityType = "cart" | "preview_session" | "mutation_queue";

export type OfflineMutationType =
  | "cart.add_item"
  | "cart.update_quantity"
  | "cart.remove_item"
  | "preview.save"
  | "preview.attach_to_cart";

export type OfflineMutationStatus =
  | "queued"
  | "syncing"
  | "synced"
  | "failed"
  | "dead_letter";

export type OfflineMutationRecord<TPayload = Record<string, unknown>> = {
  id: string;
  idempotencyKey: string;
  type: OfflineMutationType;
  payload: TPayload;
  createdAt: string;
  attempts: number;
  status: OfflineMutationStatus;
  lastError?: string;
};

export type OfflineSyncResult = {
  processed: number;
  succeeded: number;
  failed: number;
  deadLettered: number;
};

export type OfflineConflictResolution = {
  strategy: "server_wins" | "client_wins" | "manual_merge";
  reason: string;
  serverVersion?: Record<string, unknown>;
  clientVersion?: Record<string, unknown>;
};
