// ? NO NEED In THIS PROJECT

import { baseApi } from "./baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlistByUser: builder.query({
      query: (userId: string) => ({
        url: `/wishlists/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (wishlistData) => ({
        url: "/wishlists/create-wishlist",
        method: "POST",
        body: wishlistData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlistItem: builder.mutation({
      query: (wishlistId: string) => ({
        url: `/wishlists/${wishlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetWishlistByUserQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemMutation,
} = wishlistApi;
