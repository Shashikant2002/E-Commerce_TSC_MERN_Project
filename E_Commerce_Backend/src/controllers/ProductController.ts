import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";

import ErrorHandeler from "../utils/ErrorHandaler.js";
import { ProductModal } from "../models/ProductModal.js";
import { BaseQueryType, NewProductRequest } from "../types/CommonTypes.js";
import { rm } from "fs";
import { CategoryModalTypes, ProductModalTypes } from "../types/ModalTypes.js";
import { deleteImage } from "../helpers/imageFunction.js";
import mongoose from "mongoose";
import generateRandomHexString from "../helpers/generate_id_string.js";
import { CategoryModal } from "../models/CategoryModal.js";
import { myCache } from "../app.js";
import { revalidateCache } from "../utils/myCache.js";

export const allProducts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, price, category_name, sort, page, limit } = req.query;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (Number(pageNum) - 1) * limitNum;

    const baseQuery: BaseQueryType = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      baseQuery.salse_price = {
        $lte: Number(price),
      };
    }

    if (category_name) {
      let res = await CategoryModal.findOne({ name: category_name });
      baseQuery.category = res._id;
    }

    const [products, totalProd] = await Promise.all([
      ProductModal.find(baseQuery)
        .populate(["category"])
        .sort(sort ? { salePrice: sort == "asc" ? 1 : -1 } : { createdAt: -1 })
        .limit(limitNum)
        .skip(skip),
      ProductModal.find(baseQuery).countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "All Products !!",
      products: products,
      page: Math.ceil(totalProd / limitNum),
      totalResult: totalProd,
    });
  }
);

export const allTrandingProducts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, price, category_name, sort, page, limit } = req.query;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (Number(pageNum) - 1) * limitNum;

    const baseQuery: BaseQueryType = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      baseQuery.salse_price = {
        $lte: Number(price),
      };
    }

    if (category_name) {
      let res = await CategoryModal.findOne({ name: category_name });
      baseQuery.category = res._id;
    }

    const [products, totalProd] = await Promise.all([
      ProductModal.find({ ...baseQuery, trending_product: true })
        .populate(["category"])
        .sort(sort ? { salePrice: sort == "asc" ? 1 : -1 } : { createdAt: -1 })
        .limit(limitNum)
        .skip(skip),
      ProductModal.find({
        ...baseQuery,
        trending_product: true,
      }).countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "All Tranding Products !!",
      products: products,
      page: Math.ceil(totalProd / limitNum),
      totalResult: totalProd,
    });
  }
);

export const allNewArrivalsProducts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, price, category_name, sort, page, limit } = req.query;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (Number(pageNum) - 1) * limitNum;

    const baseQuery: BaseQueryType = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      baseQuery.salse_price = {
        $lte: Number(price),
      };
    }

    if (category_name) {
      let res = await CategoryModal.findOne({ name: category_name });
      baseQuery.category = res._id;
    }

    const [products, totalProd] = await Promise.all([
      ProductModal.find({ ...baseQuery, new_arrival: true })
        .populate(["category"])
        .sort(sort ? { salePrice: sort == "asc" ? 1 : -1 } : { createdAt: -1 })
        .limit(limitNum)
        .skip(skip),
      ProductModal.find({
        ...baseQuery,
        new_arrival: true,
      }).countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "All New Arrival Products !!",
      products: products,
      page: Math.ceil(totalProd / limitNum),
      totalResult: totalProd,
    });
  }
);

export const productByCategoryName = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;

    let prod: any;
    if (myCache.has(`productByCategoryName_${name}`)) {
      prod = JSON.parse(myCache.get(`productByCategoryName_${name}`));
    } else {
      const category = await CategoryModal.findOne({ name: name });
      const product = await ProductModal.find({
        category: category._id,
      })
        .populate(["category"])
        .sort({ createdAt: -1 });

      if (!product) {
        return next(new ErrorHandeler("Product Not Found !!", 400));
      }

      myCache.set(`productByCategoryName_${name}`, JSON.stringify(product));
      prod = product;
    }

    res.status(200).json({
      success: true,
      message: "Single Product !!",
      product: prod,
    });
  }
);

export const productById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let prod: any;
    if (myCache.has(`productById_${id}`)) {
      prod = JSON.parse(myCache.get(`productById_${id}`));
    } else {
      const product = await ProductModal.findById(id).populate(["category"]);

      if (!product) {
        return next(new ErrorHandeler("Product Not Found !!", 400));
      }

      myCache.set(`productById_${id}`, JSON.stringify(product));

      prod = product;
    }

    res.status(200).json({
      success: true,
      message: "Single Product !!",
      product: prod,
    });
  }
);

export const productBySlug = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;

    let prod: any;
    if (myCache.has(`productBySlug_${slug}`)) {
      prod = JSON.parse(myCache.get(`productBySlug_${slug}`));
    } else {
      const product = await ProductModal.findOne({
        product_slug: slug,
      }).populate(["category"]);

      if (!product) {
        return next(new ErrorHandeler("Product Not Found !!", 400));
      }

      myCache.set(`productBySlug_${slug}`, JSON.stringify(product));

      prod = product;
    }

    res.status(200).json({
      success: true,
      message: "Single Product !!",
      product: prod,
    });
  }
);

export const productDeleteById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandeler("Please Proide Product Id !!", 400));
    }

    const product: ProductModalTypes = await ProductModal.findByIdAndDelete(id);

    if (!product) {
      return next(new ErrorHandeler("Product Not Found !!", 400));
    }

    await rm(product?.photo, () => {
      console.log("Image Deleted Successfull !!");
    });

    await revalidateCache({ product: true });

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfull !!",
      product: product,
    });
  }
);

export const createProduct = CatchAsyncError(
  async (
    req: Request<{}, {}, NewProductRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      product_regular_price,
      salse_price,
      stock,
      category,
      product_description,
      new_arrival,
      trending_product,
    } = req.body;

    const photo = req.file;
    console.log("photo, Main", photo);

    if (!name || !photo || !salse_price) {
      deleteImage(photo.path);
      return next(new ErrorHandeler("Please Fill Required Fields !!", 400));
    }

    const isProd = await ProductModal.findOne({
      product_slug: name.split(" ").join("-").toLowerCase(),
    });

    if (isProd) {
      deleteImage(photo.path);
      return next(
        new ErrorHandeler("This Name Product Already Exiest !!", 400)
      );
    }

    const product = await ProductModal.create({
      _id: generateRandomHexString(),
      product_slug: name.split(" ").join("-").toLowerCase(),
      name: name,
      photo: photo.path,
      product_regular_price: product_regular_price,
      salse_price: salse_price,
      stock: stock,
      category: category,
      product_description: product_description,
      new_arrival: new_arrival,
      trending_product: trending_product,
    });

    await revalidateCache({ product: true });

    res.status(200).json({
      success: true,
      message: "Product Created Successfull !!",
      product: product,
    });
  }
);

export const updateProduct = CatchAsyncError(
  async (req: Request<any>, res: Response, next: NextFunction) => {
    const photo = req.file;
    console.log("photo, Main", photo);

    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandeler("Proide Product Id !!", 400));
    }

    const isProd = await ProductModal.findById(id);

    if (!isProd) {
      return next(new ErrorHandeler("Product is not Found !!", 400));
    }

    if (photo?.path) {
      deleteImage(isProd.photo);
    }

    await ProductModal.findByIdAndUpdate(id, {
      ...req.body,
      photo: photo?.path ? photo?.path : isProd?.photo,
      product_slug: req?.body?.name
        ? req?.body?.name.split(" ").join("-").toLowerCase()
        : isProd.product_slug,
    });

    await revalidateCache({ product: true });

    res.status(200).json({
      success: true,
      message: "Product Updated Successfull !!",
    });
  }
);
