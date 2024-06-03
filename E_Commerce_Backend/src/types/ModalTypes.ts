import { ObjectId } from "mongoose";

export interface UserModalType extends Document {
  _id: string;
  user_name: string;
  email: string;
  phone: number;
  photo: string;
  role: "admin" | "user";
  gender: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
  password: string;
  address: string;
  comparePassword: (password: string) => {};
  getJWTToken: () => {};
}

export interface ProductModalTypes {
  _id: string;
  name: string;
  product_slug: string;
  photo: string;
  product_regular_price: number;
  salse_price: number;
  stock: number;
  category: ObjectId;
  new_arrival: boolean;
  trending_product: boolean;
  product_description: string;
  product_review: {
    user_id: string;
    rating: number;
    created_at: Date;
    rating_description: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderModalTypes {
  _id: string;
  customer: ObjectId;
  payment_mode: string;
  delivery_charges: number;
  order_total: number;
  order_status: string;
  shipping_address: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  product: {
    product_id: ObjectId;
    product_purchase_price: number;
    product_quty: number;
  }[];
  tax: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryModalTypes {
  _id: string;
  name: string;
  photo: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CouponModalTypes {
  _id: string;
  name: string;
  photo: string;
  description: string;
  isShow: boolean;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
