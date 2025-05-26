import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemsByUser: builder.query({
      query: (userId: string) => ({
        url: `/carts/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/carts/add-to-cart",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ cartId, updatedData }) => ({
        url: `/carts/${cartId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (cartId: string) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartItemsByUserQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
