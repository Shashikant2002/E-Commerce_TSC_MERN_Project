import express from "express";
import AdminAuth from "../middleware/Auth.js";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
import {
  allCoupons,
  couponsFindByid,
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from "../controllers/CouponController.js";
const router = express.Router();

// Login User Routes
router.get("/coupon/:id", AdminAuth, couponsFindByid);

// Super Admin Routes
router.post("/coupon/create", SuperAdminAuth, createCoupon);
router.get("/coupon_all", SuperAdminAuth, allCoupons);
router.put("/coupon/:id", SuperAdminAuth, updateCoupon);
router.delete("/coupon/:id", SuperAdminAuth, deleteCoupon);

export default router;
