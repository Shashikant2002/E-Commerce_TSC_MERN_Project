import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";
import axios from "axios";

export const fetchSellingProduct = createAsyncThunk(
  "productSlice/fetchSellingProduct",
  async ({ page, limit }: { page: number; limit: number }) => {
    const url = `${baseUrl}/api/v1/product/all?limit=${limit}&page=${page}`;
    const res = await axios.get(url);
    return res.data;
  }
);

export const fetchTrendingProduct = createAsyncThunk(
  "productSlice/fetchTrendingProduct",
  async () => {
    const url = `${baseUrl}/api/v1/tranding/product/all?limit=5`;
    const res = await axios.get(url);
    return res.data;
  }
);

export const fetchNewArrivalProduct = createAsyncThunk(
  "productSlice/fetchNewArrivalProduct",
  async () => {
    const url = `${baseUrl}/api/v1/new/arrival/product/all?limit=5`;
    const res = await axios.get(url);
    return res.data;
  }
);
