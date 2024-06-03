import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchMe } from "../asyncThunk/userAsync";

export interface UserSlice {
  userData: any;
  auth: boolean;
  loading: boolean;
  error: any;
}

const initialState: UserSlice = {
  userData: {},
  auth: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.auth = true;
    },
    logoutSuccess: (state) => {
      state.userData = null;
      state.auth = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMe.pending, (state) => {
      state.userData = {};
      state.auth = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.auth = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.userData = {};
      state.auth = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
