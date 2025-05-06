import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =  import.meta.env.VITE_API_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  tagTypes: ['Product', 'Cart', 'Signup', 'Login'], // Add tagTypes explicitly
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "api/products",
      providesTags: ['Product']
    }),

    getCart: builder.query({
      query: () => "api/users/cart",
      providesTags: ['Cart'],
    }),
    getOrders: builder.query({
        query: () => "api/users/orders",
        providesTags: ['Orders'],
      }),
      getAdminOrders: builder.query({
        query: () => "api/admin/orders",
        providesTags: ['Orders'],
      }),
  
    getMe: builder.query({
      query: () => "api/users/me",
    }),
    getAdmin: builder.query({
        query: () => "api/admin/me",
      }),
    addProduct: builder.mutation({
        query: (product) => ({
          url: "api/products/add",
          method: "POST",
          body: product,
        }),
        invalidatesTags: ["Product"],
      }),
    addtoCart: builder.mutation({
      query: (cartItem) => ({
        url: "api/users/cart/add",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    addOrder: builder.mutation({
        query: (order) => ({
          url: "api/users/orders/add",
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["Orders"],
      }),
  
    updateCart: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `api/users/cart/update/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      async onQueryStarted({ itemId, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.find((item) => item._id === itemId);
            if (item) {
              item.quantity = quantity;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),

    removefromCart: builder.mutation({
      query: (itemId) => ({
        url: `api/users/cart/remove/${itemId}`,
        method: "DELETE",
      }),
      async onQueryStarted(itemId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData("getCart", undefined, (draft) => {
            return draft.filter((item) => item._id !== itemId);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: "api/users/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Signup"],
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "api/users/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Login"],
    }),
    adminLogin: builder.mutation({
        query: (adminData) => ({
          url: "api/admin/login",
          method: "POST",
          body: adminData,
        }),
        invalidatesTags: ["Login"],
      }),
      adminChangeOrderStatus: builder.mutation({
        query: (orderData) => ({
          url: "api/admin/orders/status",
          method: "POST",
          body: orderData,
        }),
        invalidatesTags: ["Login"],
      }),
      deleteProduct: builder.mutation({
        query: (itemId) => ({
          url: `api/products/delete/${itemId}`,
          method: "DELETE",
        invalidatesTags: ["Product"],
    }),}),
    logout: builder.mutation({
      query: () => ({
        url: 'api/users/logout',
        method: 'POST',
      }),
    }),
    adminLogout: builder.mutation({
        query: () => ({
          url: 'api/admin/logout',
          method: 'POST',
        }),
      }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMeQuery,
  useUpdateCartMutation,
  useLogoutMutation,
  useSignupMutation,
  useLoginMutation,
  useGetCartQuery,
  useAddtoCartMutation,
  useRemovefromCartMutation,
  useAdminLoginMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetAdminOrdersQuery,
  useAdminChangeOrderStatusMutation,
  useGetAdminQuery,
  useAdminLogoutMutation 
} = productsApi;
