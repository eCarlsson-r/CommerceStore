"use client";

/**
 * IndexedDB storage for offline-first PWA
 * Stores: cart snapshots, preview sessions, deferred mutations queue
 */

const DB_NAME = "commerce_store_v1";
const DB_VERSION = 1;

export enum StoreName {
  CART_SNAPSHOT = "cart_snapshot",
  PREVIEW_SESSIONS = "preview_sessions",
  MUTATION_QUEUE = "mutation_queue",
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("IndexedDB not available in server environment"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Cart snapshot store
      if (!db.objectStoreNames.contains(StoreName.CART_SNAPSHOT)) {
        db.createObjectStore(StoreName.CART_SNAPSHOT, { keyPath: "id" });
      }

      // Preview sessions store
      if (!db.objectStoreNames.contains(StoreName.PREVIEW_SESSIONS)) {
        const previewStore = db.createObjectStore(StoreName.PREVIEW_SESSIONS, {
          keyPath: "previewId",
        });
        previewStore.createIndex("productId", "productId", { unique: false });
        previewStore.createIndex("createdAt", "createdAt", { unique: false });
      }

      // Mutation queue store
      if (!db.objectStoreNames.contains(StoreName.MUTATION_QUEUE)) {
        const queueStore = db.createObjectStore(StoreName.MUTATION_QUEUE, {
          keyPath: "id",
        });
        queueStore.createIndex("status", "status", { unique: false });
        queueStore.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
  });

  return dbPromise;
}

// Generic CRUD operations
async function getAll<T>(storeName: StoreName): Promise<T[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  }
}

async function getById<T>(storeName: StoreName, id: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve((request.result as T) || null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

async function put<T>(storeName: StoreName, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(value);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    console.error(`Failed to put item in ${storeName}`);
  }
}

async function remove(storeName: StoreName, id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    console.error(`Failed to remove item from ${storeName}`);
  }
}

async function clear(storeName: StoreName): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    console.error(`Failed to clear ${storeName}`);
  }
}

// Cart Snapshot operations
export type CartSnapshot = {
  id: string;
  items: unknown[];
  total: number;
  updatedAt: string;
};

export const cartSnapshotDB = {
  async get(): Promise<CartSnapshot | null> {
    const snapshots = await getAll<CartSnapshot>(StoreName.CART_SNAPSHOT);
    return snapshots[0] || null;
  },

  async save(items: unknown[], total: number): Promise<void> {
    const snapshot: CartSnapshot = {
      id: "current",
      items,
      total,
      updatedAt: new Date().toISOString(),
    };
    await put(StoreName.CART_SNAPSHOT, snapshot);
  },

  async clear(): Promise<void> {
    await clear(StoreName.CART_SNAPSHOT);
  },
};

// Preview Session operations
export type PreviewSession = {
  previewId: string;
  productId: number;
  productImage: string;
  roomDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  selectedWall: "front" | "back" | "left" | "right" | "all";
  tileScale: number;
  patternRepeat?: number;
  roomPreviewUrl?: string;
  wallCoverage?: {
    wall: "front" | "back" | "left" | "right" | "all";
    width: number;
    height: number;
    rollsNeeded: number;
  }[];
  createdAt: string;
};

export const previewSessionDB = {
  async getAll(): Promise<PreviewSession[]> {
    const sessions = await getAll<PreviewSession>(StoreName.PREVIEW_SESSIONS);
    return sessions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getById(previewId: string): Promise<PreviewSession | null> {
    return getById<PreviewSession>(StoreName.PREVIEW_SESSIONS, previewId);
  },

  async save(session: PreviewSession): Promise<void> {
    await put(StoreName.PREVIEW_SESSIONS, session);
  },

  async remove(previewId: string): Promise<void> {
    await remove(StoreName.PREVIEW_SESSIONS, previewId);
  },

  async clear(): Promise<void> {
    await clear(StoreName.PREVIEW_SESSIONS);
  },
};

// Mutation Queue operations (enhanced version of localStorage queue)
export type MutationQueueItem = {
  id: string;
  idempotencyKey: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
  status: "queued" | "syncing" | "failed" | "dead_letter";
  lastError?: string;
};

export const mutationQueueDB = {
  async getAll(): Promise<MutationQueueItem[]> {
    const items = await getAll<MutationQueueItem>(StoreName.MUTATION_QUEUE);
    return items.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  },

  async getQueued(): Promise<MutationQueueItem[]> {
    const all = await this.getAll();
    return all.filter((item) => item.status === "queued" || item.status === "failed");
  },

  async enqueue(item: Omit<MutationQueueItem, "id" | "createdAt" | "attempts" | "status">): Promise<MutationQueueItem> {
    const newItem: MutationQueueItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      attempts: 0,
      status: "queued",
    };
    await put(StoreName.MUTATION_QUEUE, newItem);
    return newItem;
  },

  async updateStatus(
    id: string,
    status: MutationQueueItem["status"],
    lastError?: string
  ): Promise<void> {
    const item = await getById<MutationQueueItem>(StoreName.MUTATION_QUEUE, id);
    if (!item) return;

    const updated: MutationQueueItem = {
      ...item,
      status,
      attempts: status === "failed" ? item.attempts + 1 : item.attempts,
      lastError,
    };
    await put(StoreName.MUTATION_QUEUE, updated);
  },

  async remove(id: string): Promise<void> {
    await remove(StoreName.MUTATION_QUEUE, id);
  },

  async clear(): Promise<void> {
    await clear(StoreName.MUTATION_QUEUE);
  },
};
