import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";

export interface NewUserRequest {
  user_name: string;
  email: string;
  phone: number;
  photo: string;
  gender: string;
  dob: Date;
  _id: string;
  password: string;
}

export interface NewProductRequest {
  name: string;
  photo: string;
  product_regular_price: number;
  salse_price: number;
  stock: number;
  category: string;
  product_description: string;
  new_arrival: boolean;
  trending_product: boolean;
}

export interface NewCategoryRequest {
  name: string;
  description: string;
}

export interface NewOrderRequest {
  payment_mode: string;
  order_total: string;
  tax: number;
  shipping_address: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  product: any;
  discount: number
}

export interface NewCouponRequest {
  coupon: string;
  amount: number;
  type: string;
  isShow: boolean;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface BaseQueryType {
  name?: {
    $regex: any;
    $options: string;
  };
  salse_price?: {
    $lte: number;
  };
  category?: string;
}
