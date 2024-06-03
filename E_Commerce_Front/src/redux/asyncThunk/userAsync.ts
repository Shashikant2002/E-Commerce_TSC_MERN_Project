import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";
import axios from "axios";

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async ({}: {}, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/api/v1/me`;
      const res = await axios.get(url, { withCredentials: true });
      console.log(res);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
