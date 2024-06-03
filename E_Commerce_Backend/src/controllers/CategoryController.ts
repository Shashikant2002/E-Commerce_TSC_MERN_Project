import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";

import ErrorHandeler from "../utils/ErrorHandaler.js";
import ShortUniqueId from "short-unique-id";
import { NewCategoryRequest, NewProductRequest } from "../types/CommonTypes.js";
import { rm } from "fs";
import { CategoryModalTypes } from "../types/ModalTypes.js";
import { deleteImage } from "../helpers/imageFunction.js";
import { CategoryModal } from "../models/CategoryModal.js";
import generateRandomHexString from "../helpers/generate_id_string.js";
import { myCache } from "../app.js";
import { revalidateCache } from "../utils/myCache.js";

export const allCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let cat = [];

    if (myCache.has("category")) {
      cat = JSON.parse(myCache.get("category"));
    } else {
      const category = await CategoryModal.find({}).sort({ createdAt: -1 });
      myCache.set("category", JSON.stringify(category));
      cat = category;
    }

    res.status(200).json({
      success: true,
      message: "All Category !!",
      categorys: cat,
    });
  }
);

export const categoryById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let cate: any;
    if (myCache.has(`categoryById_${id}`)) {
      cate = JSON.parse(myCache.get(`categoryById_${id}`));
    } else {
      const category = await CategoryModal.findById(id);
      if (!category) {
        return next(new ErrorHandeler("Category Not Found !!", 400));
      }
      myCache.set(`categoryById_${id}`, JSON.stringify(category));
      cate = category;
    }

    res.status(200).json({
      success: true,
      message: "Single category !!",
      category: cate,
    });
  }
);

export const categoryDeleteById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandeler("Please Proide category Id !!", 400));
    }

    const category: CategoryModalTypes = await CategoryModal.findByIdAndDelete(
      id
    );

    if (!category) {
      return next(new ErrorHandeler("Category Not Found !!", 400));
    }

    await rm(category?.photo, () => {
      console.log("Image Deleted Successfull !!");
    });

    await revalidateCache({ category: true });

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfull !!",
      category: category,
    });
  }
);

export const createCategory = CatchAsyncError(
  async (
    req: Request<{}, {}, NewCategoryRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description } = req.body;

    const photo = req.file;
    console.log("photo, Main", photo);

    if (!name || !photo || !description) {
      deleteImage(photo.path);
      return next(new ErrorHandeler("Please Fill Required Fields !!", 400));
    }

    const isCate = await CategoryModal.findOne({
      name: name,
    });

    if (isCate) {
      deleteImage(photo.path);
      return next(
        new ErrorHandeler("This Name Category Already Exiest !!", 400)
      );
    }

    const category = await CategoryModal.create({
      _id: generateRandomHexString(),
      name: name,
      photo: photo.path,
      description: description,
    });

    await revalidateCache({ category: true });

    res.status(200).json({
      success: true,
      message: "Category Created Successfull !!",
      category: category,
    });
  }
);
