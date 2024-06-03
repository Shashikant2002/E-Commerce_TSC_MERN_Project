import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";
import { NewCouponRequest } from "../types/CommonTypes.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import generateRandomHexString from "../helpers/generate_id_string.js";
import { CouponModalTypes } from "../types/ModalTypes.js";
import { CouponModal } from "../models/CouponModal.js";

export const allCoupons = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupons = await CouponModal.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All Coupons",
      coupons: coupons,
    });
  }
);

export const couponsFindByid = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const coupon = await CouponModal.findById(id);

    if (!coupon) {
      return next(new ErrorHandeler("Coupon Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Coupon Detail Find Successful !!",
      coupon: coupon,
    });
  }
);

export const deleteCoupon = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const coupon = await CouponModal.findByIdAndDelete(id);

    if (!coupon) {
      return next(new ErrorHandeler("Coupon Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Coupon Deleted Successfull !!",
      coupon: coupon,
    });
  }
);

export const updateCoupon = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;

    const coupon = await CouponModal.findByIdAndUpdate(id, { ...req.body });

    if (!coupon) {
      return next(new ErrorHandeler("Coupon Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Coupon Updated Successful !!",
    });
  }
);

export const createCoupon = CatchAsyncError(
  async (
    req: Request<{}, {}, NewCouponRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { coupon, amount, type, isShow } = req.body;

    if (!coupon || !amount || !type) {
      return next(new ErrorHandeler("Please Fill All The Field !!", 400));
    }

    const isCoupon = await CouponModal.findOne({ coupon: coupon });

    if (isCoupon) {
      return next(new ErrorHandeler("Coupon is Already Exiest !!", 400));
    }

    const couponResult: CouponModalTypes = await CouponModal.create({
      _id: generateRandomHexString(),
      coupon,
      amount,
      type,
      isShow,
    });

    res.status(200).json({
      success: true,
      message: `Order Created Successful !!`,
      coupon: couponResult,
    });
  }
);
