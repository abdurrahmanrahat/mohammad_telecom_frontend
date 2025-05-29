import { baseApi } from "./baseApi";

const productReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByProduct: builder.query({
      query: ({ productId, args }) => ({
        url: `/products/${productId}/reviews`,
        method: "GET",
        params: args,
      }),
      providesTags: ["product-review"],
    }),

    addReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/products/${productId}/reviews/create-review`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["product-review"],
    }),

    updateReview: builder.mutation({
      query: ({ productId, reviewId, updatedData }) => ({
        url: `/products/${productId}/reviews/${reviewId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["product-review"],
    }),

    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/products/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-review"],
    }),
  }),
});

export const {
  useGetReviewsByProductQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = productReviewApi;
