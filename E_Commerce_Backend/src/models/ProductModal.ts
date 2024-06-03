import mongoose from "mongoose";
import { ProductModalTypes } from "../types/ModalTypes.js";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Proide _id !!"],
    },
    name: {
      type: String,
      required: [true, "Please Proide Name !!"],
      trim: true,
    },
    product_slug: {
      type: String,
      required: [true, "Please Proide Product Slug"],
      unique: [true, "Already Exiest !!"],
    },
    photo: {
      type: String,
      required: [true, "Please Proide Photo !!"],
    },
    product_regular_price: {
      type: Number,
    },
    salse_price: {
      type: Number,
      required: [true, "Please Proide Price !!"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category_Schema",
      required: [true, "Please Fill The Category !!"],
    },
    new_arrival: {
      type: Boolean,
      default: false,
    },
    trending_product: {
      type: Boolean,
      default: false,
    },
    product_description: {
      type: String,
    },
    product_review: [
      {
        user_id: mongoose.Schema.ObjectId,
        rating: { type: Number },
        created_at: { type: String },
        rating_description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ProductModal = mongoose.model<ProductModalTypes>(
  "Product_Schema",
  schema
);
