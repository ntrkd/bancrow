export class IndexedDBStore {
  private db: IDBDatabase | null = null;

  constructor(
    private dbName: string,
    private version: number = 1
  ) {}

  async open(storeNames: string[] = []): Promise<void> {
    if (this.db) return;

    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = () => {
        const db = request.result;

        console.warn(`[IndexedDB] Upgrade needed for ${this.dbName}`);

        for (const storeName of storeNames) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("[IndexedDB] Open error:", request.error);
        reject(request.error);
      };

      request.onblocked = () => {
        console.warn("[IndexedDB] Open blocked (another tab using DB?)");
      };
    });
  }

  async save<T>(
    storeName: string,
    key: IDBValidKey,
    value: T
  ): Promise<void> {
    if (!this.db) {
      throw new Error("DB not opened. Call open() first.");
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = this.db!.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        const request = store.put(value, key);

        request.onerror = () => {
          console.error("[IndexedDB] Put error:", {
            key,
            value,
            error: request.error,
          });
          reject(request.error);
        };

        tx.oncomplete = () => {
          resolve();
        };

        tx.onerror = () => {
          console.error("[IndexedDB] Transaction error:", {
            storeName,
            error: tx.error,
          });
          reject(tx.error);
        };

        tx.onabort = () => {
          console.warn("[IndexedDB] Transaction aborted:", {
            storeName,
          });
        };
      } catch (err) {
        console.error("[IndexedDB] Unexpected save error:", err);
        reject(err);
      }
    });
  }

  async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    if (!this.db) {
      throw new Error("DB not opened. Call open() first.");
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = this.db!.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);

        const request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result as T);
        };

        request.onerror = () => {
          console.error("[IndexedDB] Get error:", {
            key,
            error: request.error,
          });
          reject(request.error);
        };
      } catch (err) {
        console.error("[IndexedDB] Unexpected get error:", err);
        reject(err);
      }
    });
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}