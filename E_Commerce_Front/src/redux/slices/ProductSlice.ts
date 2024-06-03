import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNewArrivalProduct,
  fetchSellingProduct,
  fetchTrendingProduct,
} from "../asyncThunk/productAsync";

export interface CategorySlice {
  sellingProduct: any;
  trendingProduct: any;
  newArrivalsProduct: any;
  error: any;
  loading: boolean;
}

const initialState: CategorySlice = {
  sellingProduct: [],
  trendingProduct: {},
  newArrivalsProduct: {},
  error: null,
  loading: false,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addInProduct: (state, action) => {
      state.sellingProduct.products = [
        ...state.sellingProduct.products,
        ...action.payload,
      ];
    },
  },

  extraReducers: (builder) => {
    // fetchSellingProduct ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    builder.addCase(fetchSellingProduct.pending, (state) => {
      state.sellingProduct = {};
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellingProduct.fulfilled, (state, action) => {
      state.sellingProduct = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchSellingProduct.rejected, (state, action) => {
      state.sellingProduct = {};
      state.loading = false;
      state.error = action.payload;
    });

    // fetchNewArrivalProduct ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    builder.addCase(fetchNewArrivalProduct.pending, (state) => {
      state.newArrivalsProduct = {};
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNewArrivalProduct.fulfilled, (state, action) => {
      state.newArrivalsProduct = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchNewArrivalProduct.rejected, (state, action) => {
      state.newArrivalsProduct = {};
      state.loading = false;
      state.error = action.payload;
    });

    // fetchTrendingProduct ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    builder.addCase(fetchTrendingProduct.pending, (state) => {
      state.trendingProduct = {};
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTrendingProduct.fulfilled, (state, action) => {
      state.trendingProduct = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTrendingProduct.rejected, (state, action) => {
      state.trendingProduct = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addInProduct } = productSlice.actions;

export default productSlice.reducer;
