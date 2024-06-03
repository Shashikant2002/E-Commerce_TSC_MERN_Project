import express from "express";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
import {
  getBarDashboard,
  getLineDashboard,
  getPieDashboard,
  getStatesDashboard,
} from "../controllers/StatesController.js";

const router = express.Router();

// Super Admin Routes
router.get("/states", SuperAdminAuth, getStatesDashboard);
router.get("/pie", SuperAdminAuth, getPieDashboard);
router.get("/bar", SuperAdminAuth, getBarDashboard);
router.get("/line", SuperAdminAuth, getLineDashboard);

export default router;
