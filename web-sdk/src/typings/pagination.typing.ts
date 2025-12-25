export type PageInfo = {
  hasNextPage: boolean;
  endCursor?: string | null;
};

export type Edge<T> = {
  node: T;
  cursor?: string;
};

export type Connection<T> = {
  edges?: Edge<T>[] | null;
  pageInfo?: PageInfo | null;
};

export type CursorVariables = {
  after?: string | null;
};
