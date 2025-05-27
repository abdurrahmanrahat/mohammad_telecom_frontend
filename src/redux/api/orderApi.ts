import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/orders",
        method: "GET",
        params: args,
      }),
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (payload: { orderId: string; updatedData: any }) => ({
        url: `/orders/${payload.orderId}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
