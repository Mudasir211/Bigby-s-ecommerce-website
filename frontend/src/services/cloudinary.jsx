// features/api/apiSlice.js or wherever your API slice is
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cloudinaryApi = createApi({
  reducerPath: 'cloudinaryApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CLOUDINARY_API }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // unsigned preset
        
        return {
          url: 'image/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApi;
