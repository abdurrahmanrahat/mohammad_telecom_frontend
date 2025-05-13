import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: args,
      }),
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories/create-category",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `/categories/${payload.categoryId}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
