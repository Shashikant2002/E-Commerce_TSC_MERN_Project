import mongoose from "mongoose";
import { OrderModalTypes } from "../types/ModalTypes.js";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Proide _id !!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User_Schema",
    },
    payment_mode: {
      type: String,
      enum: ["online", "cod"],
      required: [true, "Please Proide Payment Mode !!"],
    },
    order_total: {
      type: Number,
    },
    delivery_charges: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    order_status: {
      type: String,
      required: true,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
    shipping_address: { type: String },
    razorpay_payment_id: {
      required: [true, "Please Proide razorpay_payment_id !!"],
      type: String,
    },
    razorpay_order_id: {
      required: [true, "Please Proide razorpay_order_id !!"],
      type: String,
    },
    product: [
      {
        product_id: {
          type: mongoose.Schema.ObjectId,
          ref: "User_Schema",
        },
        product_purchase_price: {
          type: Number,
        },
        product_quty: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export const OrderModal = mongoose.model<OrderModalTypes>(
  "Order_Schema",
  schema
);
