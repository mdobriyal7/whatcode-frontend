import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url: "/cart",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: ["CartItems"],
    }),
    addToCart: builder.mutation({
      query: (menuItem) => ({
        url: "/cart",
        method: "POST",
        body: menuItem,
      }),
      invalidatesTags: ["CartItems"],
    }),
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CartItems"],
    }),
    incrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/increment/${itemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CartItems"],
    }),
    decrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/decrement/${itemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CartItems"],
    }),
    getSubtotal: builder.query({
      query: () => ({
        url: "/cart/total",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      providesTags: ["CartItems"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useGetSubtotalQuery,
} = cartApiSlice;
