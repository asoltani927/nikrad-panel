import { Connection, CursorVariables, Edge, PageInfo } from "../typings/pagination.typing";

export interface InfiniteListSdk<TResponse, TVariables> {
  listInfinite(variables: TVariables): Promise<TResponse>;
}

/**
 * Generic helper to fetch all nodes from a cursor-based infinite connection
 */
export async function fetchAllInfinite<
  TNode,
  TResponse,
  TVariables extends CursorVariables
>(
  sdk: InfiniteListSdk<TResponse, TVariables>,
  variables: TVariables,
  selectConnection: (response: TResponse) => Connection<TNode> | null | undefined
): Promise<TNode[]> {
  let after = variables.after;
  const items: TNode[] = [];

  while (true) {
    const res = await sdk.listInfinite({
      ...variables,
      after,
    });

    const connection = selectConnection(res);
    if (!connection) break;

    const edges = connection.edges ?? [];
    items.push(...edges.map((e) => e.node));

    const pageInfo = connection.pageInfo;
    if (!pageInfo?.hasNextPage) break;

    after = pageInfo.endCursor;
  }

  return items;
}
