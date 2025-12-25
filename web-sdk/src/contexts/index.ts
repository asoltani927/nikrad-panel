import { GraphQLClient } from "graphql-request";

type SDKStatus = "unknown" | "ready" | "initializing" | "change" | "fails"

interface ContextInterface {
  status: SDKStatus;
  client: GraphQLClient | undefined | null;
}

export const _context: ContextInterface = {
  status: "unknown",
  client: null,
};

export function setSdkClient(client: GraphQLClient) {
  if (!_context.client) {
    _context.client = client;
  }
  return _context.client;
}

export function getSdkClient(): GraphQLClient {
  if (!_context.client) throw new Error("ou must initialize first");
  return _context.client;
}

export function setSdkStatus(status: SDKStatus) {
  _context.status = status;
}

export function getSdkStatus(): SDKStatus {
  return _context.status;
}
