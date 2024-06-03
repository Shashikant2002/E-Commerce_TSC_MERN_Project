import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";
import { UserModal } from "../models/UserModal.js";

import { NewUserRequest } from "../types/CommonTypes.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import ShortUniqueId from "short-unique-id";
import GetUserJWTToken from "../utils/GetUserJWTToken.js";
import generateRandomHexString from "../helpers/generate_id_string.js";
import { revalidateCache } from "../utils/myCache.js";

export const findAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUser = await UserModal.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All Users",
      users: allUser,
    });
  }
);

export const userDeleteByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const user = await UserModal.findByIdAndDelete(id);

    if (!user) {
      return next(new ErrorHandeler("User Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfull !!",
      user: user,
    });
  }
);

export const updateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;

    const user = await UserModal.findByIdAndUpdate(id, { ...req.body });

    if (!user) {
      return next(new ErrorHandeler("User Not Found !!", 400));
    }

    revalidateCache({ admin: true });

    res.status(200).json({
      success: true,
      message: "User Updated Successful !!",
    });
  }
);

export const userFindById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const { id }: { id: string } = req.params;
    const user = await UserModal.findById(id);

    if (!user) {
      return next(new ErrorHandeler("User Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "User Detail Find Successful !!",
      user: user,
    });
  }
);

export const myData = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user_ = req.user;

    console.log(user_);

    const user = await UserModal.findById(user_._id);

    if (!user) {
      return next(new ErrorHandeler("User Not Found !!", 400));
    }

    res.status(200).json({
      success: true,
      message: "My Data Find Successfull !!",
      user: user,
    });
  }
);

export const registerUser = CatchAsyncError(
  async (
    req: Request<{}, {}, NewUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user_name, email, photo, gender, dob, password } = req.body;

    if (!user_name || !email || !gender || !dob || !password) {
      return next(new ErrorHandeler("Please Fill All The Field !!", 400));
    }
    const isUser = await UserModal.findOne({
      $or: [{ email: email }],
    });

    console.log(isUser);

    if (isUser) {
      return next(new ErrorHandeler("User is Already Exiest !!", 400));
    }

    console.log(generateRandomHexString());

    const user: NewUserRequest = await UserModal.create({
      _id: generateRandomHexString(),
      user_name,
      email,
      photo,
      gender,
      dob,
      password,
    });

    revalidateCache({ admin: true });

    res.status(200).json({
      success: true,
      message: `Welcome ${user.user_name}. User Created Successful. Please Login !!`,
      user: user,
    });
  }
);

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("askdjflk", req.body);
    const { password, email } = req.body;

    if (!password || !email) {
      return next(new ErrorHandeler("Please Fill All the Field !!", 400));
    }

    let user = await UserModal.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorHandeler("Email or Password is Wrong !!", 400));
    }

    const isPassword = await user.comparePassword(password);

    user.password = null;

    if (isPassword) {
      console.log(user, isPassword);

      const token = await user.getJWTToken();

      GetUserJWTToken(user, 200, res);
    } else {
      return next(new ErrorHandeler("Email or Password is Wrong !!", 400));
    }
  }
);

export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const option: {} = {
      maxAge: new Date(new Date(Date.now())),
      sameSite: "none",
      secure: true,
      crossDomain: true,
    };

    res.cookie("JWT_USER_TOKEN", "", option);
    res.status(200).json({
      success: true,
      message: "Logout Successfull !!",
    });
  }
);
