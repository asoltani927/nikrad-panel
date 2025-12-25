import { GraphQLClient } from "graphql-request";
import {
  CreateProductDocument,
  CreateProductMutation,
  CreateProductMutationVariables,
  UpdateProductDocument,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  DeleteProductDocument,
  DeleteProductMutation,
  DeleteProductMutationVariables,
  PaginatedProductsDocument,
  PaginatedProductsQuery,
  PaginatedProductsQueryVariables,
  InfiniteProductsDocument,
  InfiniteProductsQuery,
  InfiniteProductsQueryVariables,
} from "@shop/graphql";
import { fetchAllInfinite, InfiniteListSdk } from "@/utils/fetch-all-infinite.util";

export function createProductsSdk(client: GraphQLClient) {
  const mutations = {
    create(variables: CreateProductMutationVariables) {
      return client.request<CreateProductMutation>(CreateProductDocument, variables);
    },
    update(variables: UpdateProductMutationVariables) {
      return client.request<UpdateProductMutation>(UpdateProductDocument, variables);
    },
    delete(variables: DeleteProductMutationVariables) {
      return client.request<DeleteProductMutation>(DeleteProductDocument, variables);
    },
  };

  const paginated = {
    list(variables: PaginatedProductsQueryVariables = {}) {
      return client.request<PaginatedProductsQuery>(PaginatedProductsDocument, variables);
    },
  };

  const infinite = {
    listInfinite(variables: InfiniteProductsQueryVariables) {
      return client.request<InfiniteProductsQuery>(InfiniteProductsDocument, variables);
    },
    fetchAll(variables: InfiniteProductsQueryVariables) {
      const sdk: InfiniteListSdk<InfiniteProductsQuery, InfiniteProductsQueryVariables> = {
        listInfinite: (v) => client.request<InfiniteProductsQuery>(InfiniteProductsDocument, v),
      };
      return fetchAllInfinite(sdk, variables, (res) => res.infiniteProducts);
    },
  };

  return { ...mutations, ...paginated, ...infinite };
}
