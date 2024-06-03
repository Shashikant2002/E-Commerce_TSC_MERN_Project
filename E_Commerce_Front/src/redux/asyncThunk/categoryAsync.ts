import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";
import axios from "axios";

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async () => {
    const url = `${baseUrl}/api/v1/category/all`;
    const res = await axios.get(url);
    return res.data;
  }
);
