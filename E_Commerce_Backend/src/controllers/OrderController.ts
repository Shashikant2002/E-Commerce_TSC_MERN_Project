import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";

import { NewOrderRequest, NewUserRequest } from "../types/CommonTypes.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import ShortUniqueId from "short-unique-id";
import generateRandomHexString from "../helpers/generate_id_string.js";
import { OrderModal } from "../models/OrderModal.js";
import { OrderModalTypes } from "../types/ModalTypes.js";
import { ProductModal } from "../models/ProductModal.js";
import { revalidateCache } from "../utils/myCache.js";

export const allOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await OrderModal.find({})
      .populate({
        path: "product",
        populate: {
          path: "product_id",
          model: "Product_Schema",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All Orders",
      orders: orders,
    });
  }
);

export const orderFindByid = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const order = await OrderModal.findById(id);

    if (!order) {
      return next(new ErrorHandeler("Order Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Order Detail Find Successful !!",
      user: order,
    });
  }
);

export const orderFindByUserID = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user;

    const order = await OrderModal.find({ user: user._id });

    res.status(200).json({
      success: true,
      message: "Order Detail Find Successful !!",
      user: order,
    });
  }
);

export const deleteOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const order = await OrderModal.findByIdAndDelete(id);

    if (!order) {
      return next(new ErrorHandeler("Order Not Found !!", 400));
    }

    revalidateCache({order: true})

    res.status(200).json({
      success: true,
      message: "User Deleted Successfull !!",
      user: order,
    });
  }
);

export const updateOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;

    const order = await OrderModal.findByIdAndUpdate(id, { ...req.body });

    if (!order) {
      return next(new ErrorHandeler("User Not Found !!", 400));
    }

    revalidateCache({order: true})

    res.status(200).json({
      success: true,
      message: "Order Updated Successful !!",
    });
  }
);

export const createOrder = CatchAsyncError(
  async (
    req: Request<{}, {}, NewOrderRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      payment_mode,
      order_total,
      tax,
      discount,
      shipping_address,
      razorpay_payment_id,
      razorpay_order_id,
      product,
    } = req.body;

    if (
      !payment_mode ||
      !order_total ||
      !tax ||
      !shipping_address ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !product
    ) {
      return next(new ErrorHandeler("Please Fill All The Field !!", 400));
    }

    // @ts-ignore
    const customer = req.user;

    let mainProduct: {
      product_id: string;
      product_purchase_price: number;
      product_quty: number;
    }[] = [];

    for (let ele of product) {
      mainProduct.push({
        product_id: ele.product_id._id,
        product_purchase_price: ele.product_id.salse_price,
        product_quty: ele.product_quty,
      });

      const prod = await ProductModal.findById(ele.product_id._id);

      if (prod) {
        if (!prod.stock || prod.stock < ele.product_quty) {
          return next(
            new ErrorHandeler("Product Quantity not Available !!", 400)
          );
        } else {
          prod.stock -= ele.product_quty;
          await prod.save();
        }
      }
    }

    const order: OrderModalTypes = await OrderModal.create({
      _id: generateRandomHexString(),
      user: customer._id,
      payment_mode: payment_mode,
      delivery_charges: 0,
      order_total: order_total,
      shipping_address: shipping_address,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      tax: tax,
      discount: discount,
      product: mainProduct,
    });

    revalidateCache({order: true})

    res.status(200).json({
      success: true,
      message: `Order Created Successful !!`,
      order: order,
    });
  }
);
