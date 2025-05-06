import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/createApi"
import { newSlice } from "../services/slice"
import { cloudinaryApi } from "../services/cloudinary";

export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
      [newSlice.reducerPath]:newSlice.reducer,
      [cloudinaryApi.reducerPath]:cloudinaryApi.reducer


    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(cloudinaryApi.middleware),
      
})
