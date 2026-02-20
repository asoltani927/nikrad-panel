import { addToCartAction, AddToCartInput } from "@/actions/cart/add-to-cart.action";
import { getCart } from "@/actions/cart/get-cart.action";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const cartKeys = {
  all: ["cart"] as const,
};

/* ---------------- GET CART ---------------- */

export function useCartQuery() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
  });
}

/* ---------------- ADD TO CART ---------------- */

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddToCartInput) => addToCartAction(input),

    /* optimistic update */
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });
    },

    /* refetch cart after success */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}

export function useCart() {
  const cartQuery = useCartQuery();
  const addMutation = useAddToCart();

  return {
    cart: cartQuery.data,
    loading: cartQuery.isLoading,
    isAdding: addMutation.isPending,

    addToCart: addMutation.mutateAsync,

    refetch: cartQuery.refetch,
  };
}