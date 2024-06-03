import express from "express";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
import { singleUpload } from "../middleware/multer.js";
import {
  allCategory,
  categoryById,
  categoryDeleteById,
  createCategory,
} from "../controllers/CategoryController.js";
const router = express.Router();

router.get("/category/all", allCategory);
router.get("/category/by/id/:id", categoryById);

// Login User Routes

// Super Admin Routes
router.delete("/category/delete/by/id/:id", SuperAdminAuth, categoryDeleteById);
router.post("/category/create", SuperAdminAuth, singleUpload, createCategory);

export default router;
