import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategory } from "../asyncThunk/categoryAsync";

export interface CategorySlice {
  allCategory: any;
  error: any;
  loading: boolean;
}

const initialState: CategorySlice = {
  allCategory: {},
  error: null,
  loading: false,
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategory.pending, (state) => {
      state.allCategory = {};
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchAllCategory.rejected, (state, action) => {
      state.allCategory = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
