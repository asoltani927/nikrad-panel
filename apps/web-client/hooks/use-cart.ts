import {
  addToCartAction,
  AddToCartInput,
} from "@/actions/cart/add-to-cart.action";
import { getCart } from "@/actions/cart/get-cart.action";
import {
  removeItemFromCart,
  RemoveItemFromCartArgs,
} from "@/actions/cart/remove-item-from-cart.action";
import { setCartAddress, SetCartAddressArgs } from "@/actions/cart/set-cart-address.action";
import { updateItemCart, UpdateItemCartArgs } from "@/actions/cart/update-cart-item.action";
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

/* ---------------- Remove From CART ---------------- */

export function useDeleteItemFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RemoveItemFromCartArgs) => removeItemFromCart(input),

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

/* ---------------- Update Item CART ---------------- */

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateItemCartArgs) => updateItemCart(input),

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

/* ---------------- Update Item CART ---------------- */

export function useSetCartAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SetCartAddressArgs) => setCartAddress(input),

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
  const deleteMutation = useDeleteItemFromCart();
  const updateMutation = useUpdateCartItem();
  const setAddressMutation = useSetCartAddress();

  return {
    cart: cartQuery.data,
    loading: cartQuery.isLoading,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
    isSettingAddress: setAddressMutation.isPending,

    addToCart: addMutation.mutateAsync,
    deleteFromCart: deleteMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    setAddress: setAddressMutation.mutateAsync,

    refetch: cartQuery.refetch,
  };
}
