import { baseApi } from "./baseApi";

const productReviewApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviewsByProduct: builder.query({
      query: ({ productId, query }) => {
        return {
          url: `/products/${productId}/reviews`,
          method: "GET",
          params: query,
        };
      },
      providesTags: ["review"],
    }),
    getAllReviews: builder.query({
      query: (args: Record<string, any>) => {
        return {
          url: `/products/reviews/all-reviews`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["review"],
    }),

    addReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/products/${productId}/reviews/create-review`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["review", "product"],
    }),

    updateReview: builder.mutation({
      query: ({ productId, reviewId, updatedData }) => ({
        url: `/products/${productId}/reviews/${reviewId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["review", "product"],
    }),

    approvedReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/products/${productId}/reviews/${reviewId}/approved`,
        method: "POST",
      }),
      invalidatesTags: ["review", "product"],
    }),

    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/products/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review", "product"],
    }),
  }),
});

export const {
  useGetReviewsByProductQuery,
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useApprovedReviewMutation,
} = productReviewApi;
