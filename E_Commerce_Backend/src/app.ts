import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import Error from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";

export const myCache = new NodeCache();

app.use(
  cors({
    // origin: ["http://localhost:5173", "https://dashboard-couse.vercel.app"],
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Route Import Start
import userRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import orderRoute from "./routes/OrderRoute.js";
import couponRoute from "./routes/CouponRoute.js";
import statesRoute from "./routes/StatesRoutes.js";
// Route Import End

// Route User Start
app.use("/api/v1", userRoute);
app.use("/api/v1", ProductRoute);
app.use("/api/v1", CategoryRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", couponRoute);
app.use("/api/v1", statesRoute);
// Route User End

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Working Fine",
    success: true,
  });
});

app.use("/uploads", express.static("uploads"));
app.use(Error);

export default app;
