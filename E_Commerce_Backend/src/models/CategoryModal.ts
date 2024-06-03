import mongoose from "mongoose";
import { CategoryModalTypes } from "../types/ModalTypes.js";

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
    photo: {
      type: String,
      required: [true, "Please Proide Photo !!"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CategoryModal = mongoose.model<CategoryModalTypes>(
  "Category_Schema",
  schema
);
