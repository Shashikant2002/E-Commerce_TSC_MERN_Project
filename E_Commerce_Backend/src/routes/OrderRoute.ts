import express from "express";
import AdminAuth from "../middleware/Auth.js";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
import {
  allOrders,
  createOrder,
  deleteOrder,
  orderFindByUserID,
  orderFindByid,
  updateOrder,
} from "../controllers/OrderController.js";
const router = express.Router();

// Login User Routes
router.get("/orders/user", AdminAuth, orderFindByUserID);
router.get("/order/:id", AdminAuth, orderFindByid);
router.post("/order/create", AdminAuth, createOrder);

// Super Admin Routes
router.get("/orders/all", SuperAdminAuth, allOrders);
router.put("/order/:id", SuperAdminAuth, updateOrder);
router.delete("/order/:id", SuperAdminAuth, deleteOrder);

export default router;
