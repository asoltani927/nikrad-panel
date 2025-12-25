/**
 * Dokamerce SDK Factory
 *
 * TODOs:
 * [ ] Logger: implement structured logging for all SDK operations
 * [ ] Cache Layer: add caching for queries (LRU / Redis / in-memory)
 * [ ] Pagination & Helpers: add helpers for paginated & infinite queries
 * [ ] Batch Requests: support batching multiple requests in a single call
 * [ ] Subscriptions (Realtime): implement realtime updates via WebSockets / GraphQL subscriptions
 * [ ] Docs & Examples: write usage documentation and code examples
 * [ ] Testing & Mocking: add unit tests, integration tests, and mocks for SDK
 * [ ] Rate Limiting / Retry: implement retry with exponential backoff on errors
 */

import { initSdk } from "./functions/init-sdk.function";
import { safeCall, SDKError } from "./functions/safe-call.function";
import { ShopSDK } from "./typings/sdk.typing";
import { createProductsSdk } from "./services/products";
import { getSdkClient } from "./contexts";

export type SDKOptions = {
  realm: string;
  key: string;
  onError?: (error: SDKError) => void;
};

/**
 * Creates a Dokamerce SDK instance.
 * 
 * Current Status:
 * ✅ Initialization with realm/key via initSdk
 * ✅ Safe error handling with safeCall
 * ⚠️ Client retrieval uses getSdkClient (may need refactor for backend safety)
 * ✅ Products SDK attached
 *
 * TODO Improvements:
 * - Ensure backend safety by creating per-instance GraphQLClient instead of relying on global context
 * - Wrap all SDK methods with safeCall automatically
 */
export function createInstance(options: SDKOptions): ShopSDK {
  // 1️⃣ Initialize SDK safely
  safeCall({
    fn: () =>
      initSdk({
        realm: options.realm,
        key: options.key,
      }),
    onError: options.onError,
  });

  // 2️⃣ Retrieve GraphQL client (currently from global context)
  const client = getSdkClient();

  if (!client) {
    throw new Error("Failed to initialize client");
  }

  // 3️⃣ Return SDK instance
  return {
    products: createProductsSdk(client),
  };
}
