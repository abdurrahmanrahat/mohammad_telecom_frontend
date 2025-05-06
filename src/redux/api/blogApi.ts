import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/blogs",
        method: "GET",
        params: args,
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (blogId: string) => ({
        url: `/blogs/${blogId}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    addBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs/create-blog",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (payload) => ({
        url: `/blogs/${payload.blogId}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: (blogId: string) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
