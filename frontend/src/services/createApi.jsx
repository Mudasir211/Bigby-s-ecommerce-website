import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");

      if (token) headers.set("Authorization", `Bearer ${token}`);
      if (adminToken) headers.set("X-Admin-Auth", `Bearer ${adminToken}`);

      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Product", "Cart", "Signup", "Review", "Login"],
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "api/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `api/users/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
    getReviews: builder.query({
      query: (prodId) => `api/reviews?prodId=${prodId}`,
      providesTags: ["Review"],
    }),
    getProducts: builder.query({
      query: () => "api/products",
      providesTags: ["Product"],
    }),
    getCart: builder.query({
      query: () => "api/users/cart",
      providesTags: ["Cart"],
    }),
    getOrders: builder.query({
      query: () => "api/users/orders",
      providesTags: ["Orders"],
    }),
    getAdminOrders: builder.query({
      query: () => "api/admin/orders",
      providesTags: ["Orders"],
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
    directOrder: builder.mutation({
      query: (order) => ({
        url: "api/users/orders/directOrder",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    addReview: builder.mutation({
      query: (review) => ({
        url: "api/reviews/add",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
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
      },
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
      },
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "api/users/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Signup"],
    }),
    loginWithGoogle: builder.mutation({
      query: (body) => ({
        url: "/api/users/auth/google",
        method: "POST",
        body,
        credentials: "include",
      }),
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
      }),
      invalidatesTags: ["Product"],
    }),
    deleteReview: builder.mutation({
      query: (prodId) => ({
        url: `api/reviews/delete/${prodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "api/users/logout",
        method: "POST",
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "api/admin/logout",
        method: "POST",
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
  useAdminLogoutMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDirectOrderMutation,
} = productsApi;
