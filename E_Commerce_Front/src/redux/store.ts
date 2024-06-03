import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/ProductSlice";

export const store = configureStore({
  reducer: { userSlice, categorySlice, productSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
