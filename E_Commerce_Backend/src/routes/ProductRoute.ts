import express from "express";
import AdminAuth from "../middleware/Auth.js";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
import {
  allNewArrivalsProducts,
  allProducts,
  allTrandingProducts,
  createProduct,
  productByCategoryName,
  productById,
  productBySlug,
  productDeleteById,
  updateProduct,
} from "../controllers/ProductController.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.get("/product/all", allProducts);
router.get("/tranding/product/all", allTrandingProducts);
router.get("/new/arrival/product/all", allNewArrivalsProducts);

router.get("/product/by/id/:id", productById);
router.get("/product/by/slug/:slug", productBySlug);

// I Think Not in Use
router.get("/product/by/category/:name", productByCategoryName);

// Login User Routes

// Super Admin Routes
router.post("/product/create", SuperAdminAuth, singleUpload, createProduct);
router.post("/product/update/:id", SuperAdminAuth, singleUpload, updateProduct);
router.delete("/product/delete/by/id/:id", SuperAdminAuth, productDeleteById);

export default router;
