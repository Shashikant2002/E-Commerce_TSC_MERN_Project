import mongoose from "mongoose";
import { CouponModalTypes } from "../types/ModalTypes.js";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Proide _id !!"],
    },
    coupon: {
      type: String,
      required: [true, "Please fill the Coupon Id !!"],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "Please Fill The Amount !!"],
    },
    type: {
      type: String,
      enum: ["per", "value"],
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CouponModal = mongoose.model<CouponModalTypes>(
  "Coupon_Schema",
  schema
);
