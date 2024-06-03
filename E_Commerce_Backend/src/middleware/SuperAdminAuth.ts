// Only Login User
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";
import jwt from "jsonwebtoken";
import { UserModal } from "../models/UserModal.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";

const SuperAdminAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { JWT_USER_TOKEN } = req.cookies;

    if (!JWT_USER_TOKEN) {
      return next(new ErrorHandeler("Please Login And Try Again !!", 400));
    }

    const decode = jwt.verify(JWT_USER_TOKEN, process.env.JWT_USER_SECRET);

    const user = await UserModal.findById(decode.id);

    if (!user) {
      return next(new ErrorHandeler("Please Login And Try Again !!", 400));
    }

    if (user.role === "admin") {
      // @ts-ignore
      req.user = user;
      next();
    } else {
      return next(new ErrorHandeler("Please Login And Try Again !!", 400));
    }
  }
);

export default SuperAdminAuth;
