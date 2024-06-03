import express from "express";
import {
  findAllUsers,
  loginUser,
  logoutUser,
  myData,
  registerUser,
  updateUser,
  userDeleteByUser,
  userFindById,
} from "../controllers/UserController.js";
import AdminAuth from "../middleware/Auth.js";
import SuperAdminAuth from "../middleware/SuperAdminAuth.js";
const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// Login User Routes
router.get("/me", AdminAuth, myData);
router.get("/user/:id", AdminAuth, userFindById);
router.get("/user_logout", AdminAuth, logoutUser);
router.put("/user/:id", AdminAuth, updateUser);
router.delete("/user/:id", AdminAuth, userDeleteByUser);

// Super Admin Routes
router.get("/users", SuperAdminAuth, findAllUsers);

export default router;
