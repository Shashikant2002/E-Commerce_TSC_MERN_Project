import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../utils/CatchAsyncError.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import { CouponModal } from "../models/CouponModal.js";
import { myCache } from "../app.js";
import { ProductModal } from "../models/ProductModal.js";
import { UserModal } from "../models/UserModal.js";
import { OrderModal } from "../models/OrderModal.js";
import { OrderModalTypes, ProductModalTypes } from "../types/ModalTypes.js";
import { calcPercantage, findPer } from "../helpers/helperFunctions.js";
import { CategoryModal } from "../models/CategoryModal.js";

// For Error
// return next(new ErrorHandeler("Coupon Not Found !!", 400));

// admin-states, admin-pie-charts, admin-bar-charts, admin-line-charts

export const getStatesDashboard = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let states: any;
    if (myCache.has("admin-states")) {
      states = JSON.parse(myCache.get("admin-states") as string);
    } else {
      const today = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

      const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
      };

      const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      };

      // Product Area ======================================================>>>>>>>>>>>>>>>
      const thisMonthProductPromise = ProductModal.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthProductPromise = ProductModal.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      // User Area ======================================================>>>>>>>>>>>>>>>
      const thisMonthUserPromise = UserModal.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthUserPromise = UserModal.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      // Order Area ======================================================>>>>>>>>>>>>>>>
      const thisMonthOrderPromise = OrderModal.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const lastMonthOrderPromise = OrderModal.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      // Six Month Area ======================================================>>>>>>>>>>>>>>>
      const lastSixOrderPromise = OrderModal.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      // Promise Area ======================================================>>>>>>>>>>>>>>>
      const [
        thisMonthProduct,
        lastMonthProduct,
        thisMonthUser,
        lastMonthUser,
        thisMonthOrder,
        lastMonthOrder,
        productCount,
        users,
        orders,
        lastSixMonthOrder,
        allCategory,
        maleUserCount,
        femaleUserCount,
        otherUserCount,
        fiveLatestOrder,
      ] = await Promise.all([
        thisMonthProductPromise,
        lastMonthProductPromise,
        thisMonthUserPromise,
        lastMonthUserPromise,
        thisMonthOrderPromise,
        lastMonthOrderPromise,
        ProductModal.countDocuments(),
        UserModal.countDocuments(),
        OrderModal.find({}).select("order_total"),
        lastSixOrderPromise,
        CategoryModal.find({}).select("name _id"),
        UserModal.countDocuments({ gender: "male" }),
        UserModal.countDocuments({ gender: "female" }),
        UserModal.countDocuments({ gender: "other" }),
        OrderModal.find({}).limit(5),
      ]);

      // Logical Area ======================================================>>>>>>>>>>>>>>>

      // Revenue ===================>>>>>>>>>>>>>

      const thisMonthRevenue = thisMonthOrder.reduce(
        (total, order) => total + (order.order_total || 0),
        0
      );
      const lastMonthRevenue = lastMonthOrder.reduce(
        (total, order) => total + (order.order_total || 0),
        0
      );
      const revenue = calcPercantage(thisMonthRevenue, lastMonthRevenue);

      const productChangePer = calcPercantage(
        thisMonthProduct.length,
        lastMonthProduct.length
      );
      const userChangePer = calcPercantage(
        thisMonthUser.length,
        lastMonthUser.length
      );
      const orderChangePer = calcPercantage(
        thisMonthOrder.length,
        lastMonthOrder.length
      );

      const revenue_total = orders.reduce(
        (total, order) => total + (order.order_total || 0),
        0
      );

      // Six month Ago Data

      const orderMonthCounts = new Array(6).fill(0);
      const orderMonthRevenue = new Array(6).fill(0);

      lastSixMonthOrder.forEach((order) => {
        const createionDate = order.createdAt;
        const monthDeff =
          (today.getMonth() - createionDate.getMonth() + 12) % 12;

        if (monthDeff < 6) {
          orderMonthCounts[6 - monthDeff - 1] += 1;
          orderMonthRevenue[6 - monthDeff - 1] += order.order_total;
        }
      });

      // States ===================================================================>>>>>>>>>>>>>>>>>>>

      let changePercent = {
        revenue: revenue,
        user: userChangePer,
        product: productChangePer,
        order: orderChangePer,
      };

      let count = {
        product: productCount,
        user: users,
        order: orders.length,
        revenue_total: revenue_total,
      };

      let chart = {
        orderSixMonthCount: orderMonthCounts,
        orderSixMonthRevenue: orderMonthRevenue,
      };

      let userGenderCount = {
        male: maleUserCount,
        female: femaleUserCount,
        other: otherUserCount,
      };

      // Categories Area ===============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      let cateCountProm = allCategory.map((ele) => {
        return ProductModal.countDocuments({ category: ele._id });
      });

      let categoryCountInv = await Promise.all(cateCountProm);

      let categoryCountBlArr: Record<string, number>[] = [];

      allCategory.forEach((ele, i) => {
        categoryCountBlArr.push({
          [ele?.name]: Math.round((categoryCountInv[i] / productCount) * 100),
        });
      });

      // Main States ==============================>>>>>>>>>>>>>>>>>>>>

      states = {
        percentage: changePercent,
        count: count,
        chart,
        categoryCount: categoryCountBlArr,
        userGenderCount,
        fiveLatestOrder,
      };

      myCache.set("admin-states", JSON.stringify(states));
    }

    res.status(200).json({
      success: true,
      message: "States Data Fetched Successfull !!",
      states: states,
    });
  }
);

export const getPieDashboard = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let charts: any;

    if (myCache.has("admin-pie-charts")) {
      charts = JSON.parse(myCache.get("admin-pie-charts") as string);
    } else {
      const [
        processingOrder,
        shippedOrder,
        deliveredOrder,
        allCategory,
        productCount,
        outOfStock,
        allOrder,
        userCount,
        adminCount,
        allUsers,
      ] = await Promise.all([
        OrderModal.countDocuments({ order_status: "processing" }),
        OrderModal.countDocuments({ order_status: "shipped" }),
        OrderModal.countDocuments({ order_status: "delivered" }),
        CategoryModal.find({}).select("name"),
        ProductModal.countDocuments({}),
        ProductModal.countDocuments({ stock: { $lte: 0 } }),
        OrderModal.find({}),
        UserModal.countDocuments({ role: "user" }),
        UserModal.countDocuments({ role: "admin" }),
        UserModal.find({}).select(["dob", "age", "user_name"]),
      ]);

      const orderFullFillMent = {
        processing: processingOrder,
        shipped: shippedOrder,
        delivered: deliveredOrder,
      };

      let cateCountProm = allCategory.map((ele) => {
        return ProductModal.countDocuments({ category: ele._id });
      });

      let categoryCountInv = await Promise.all(cateCountProm);

      let categoryCountBlArr: Record<string, number>[] = [];

      allCategory.forEach((ele, i) => {
        categoryCountBlArr.push({
          [ele?.name]: Math.round((categoryCountInv[i] / productCount) * 100),
        });
      });

      let category = {
        allCategory,
        categoryCountBlArr,
      };

      const stockAvailablity = {
        inStock: productCount - outOfStock,
        outOfStock: outOfStock,
      };

      const totalGrossIncome = allOrder.reduce(
        (prev: number, order: OrderModalTypes) => {
          return prev + (order?.order_total || 0);
        },
        0
      );
      const totalDiscount = allOrder.reduce(
        (prev: number, order: OrderModalTypes) => {
          return prev + (order?.discount || 0);
        },
        0
      );
      const productionCost = allOrder.reduce(
        (prev: number, order: OrderModalTypes) => {
          return prev + (order?.delivery_charges || 0);
        },
        0
      );

      const burnet = allOrder.reduce((prev: number, order: OrderModalTypes) => {
        return prev + (order?.tax || 0);
      }, 0);

      const netMargin =
        totalGrossIncome - productionCost - burnet - totalDiscount;

      const marketingCost = totalGrossIncome * (30 / 100);

      const revenue = {
        netMargin: netMargin,
        discount: totalDiscount,
        oroductionCost: productionCost,
        burnt: burnet,
        marketingCost: marketingCost,
      };

      allUsers.map((ele) => {
        console.log(ele.age);
      });

      const users = {
        adminCount,
        userCount,
      };
      const ageGroup = {
        teen: allUsers.filter((user) => user.age < 20).length,
        adult: allUsers.filter((user) => user.age > 20 && user.age < 40).length,
        old: allUsers.filter((user) => user.age > 40).length,
      };
      // Main Chart Here

      charts = {
        order: orderFullFillMent,
        category,
        stockAvailablity,
        revenue,
        users,
        ageGroup,
      };

      // Chching Here =================>>>>>>>>>>>>>>>>>>>>>>>>>>
      myCache.set("admin-pie-charts", JSON.stringify(charts));
    }

    res.status(200).json({
      success: true,
      message: "Pie Data Fetched Successfull !!",
      charts,
    });
  }
);

export const getBarDashboard = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let charts: any;

    if (myCache.has("admin-bar-charts")) {
      charts = JSON.parse(myCache.get("admin-bar-charts") as string);
    } else {
      const today = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

      const twelveMonthAgo = new Date();
      twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);

      const lastSixMonthProductPromise = ProductModal.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      const lastSixMonthOrderPromise = OrderModal.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      const lastTwelveMonthOrderPromise = OrderModal.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      });

      const lastThreeMonthUserPromise = UserModal.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      });

      let [
        lastSixMonthProduct,
        lastSixMonthOrder,
        lastTwelveMonthOrder,
        lastThreeMonthUser,
      ] = await Promise.all([
        lastSixMonthProductPromise,
        lastSixMonthOrderPromise,
        lastTwelveMonthOrderPromise,
        lastThreeMonthUserPromise,
      ]);

      console.log("lastTwelveMonthOrderPromise", lastTwelveMonthOrder);

      const productCountSixMonths = findPer({
        length: 6,
        data: lastSixMonthProduct,
      });
      const orderCountSixMonths = findPer({
        length: 6,
        data: lastSixMonthOrder,
      });
      const orderCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthOrder,
      });
      const lastSixMonthUserCount = findPer({
        length: 6,
        data: lastThreeMonthUser,
      });

      const lastSixMonth = {
        user: lastSixMonthUserCount,
        product: productCountSixMonths,
        order: orderCountSixMonths,
      };
      const lastTwelveMonth = {
        order: orderCountTwelveMonths,
      };

      // Main Chart

      charts = { lastSixMonth, lastTwelveMonth };

      // Caching Here =================>>>>>>>>>>>>>>>>>>>>>>>>>>
      myCache.set("admin-bar-charts", JSON.stringify(charts));
    }

    res.status(200).json({
      success: true,
      message: "Bar Data Fetched Successfull !!",
      charts,
    });
  }
);

export const getLineDashboard = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let charts: any;

    if (myCache.has("admin-line-charts")) {
      charts = JSON.parse(myCache.get("admin-line-charts") as string);
    } else {
      const today = new Date();

      const twelveMonthAgo = new Date();
      twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);

      const lastTwelveMonthOrderPromise = OrderModal.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      });
      const lastTwelveMonthUserPromise = UserModal.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      });
      const lastTwelveMonthProductPromise = ProductModal.find({
        createdAt: {
          $gte: twelveMonthAgo,
          $lte: today,
        },
      });

      let [lastTwelveMonthOrder, lastTwelveMonthUser, lastTwelveMonthProduct] =
        await Promise.all([
          lastTwelveMonthOrderPromise,
          lastTwelveMonthUserPromise,
          lastTwelveMonthProductPromise,
        ]);

      console.log("lastTwelveMonthOrderPromise", lastTwelveMonthOrder);

      const orderCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthOrder,
      });
      const userCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthUser,
      });
      const productCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthProduct,
      });
      const discountCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthOrder,
        property: "discount",
      });
      const totalCountTwelveMonths = findPer({
        length: 12,
        data: lastTwelveMonthOrder,
        property: "order_total",
      });

      const lastTwelveMonth = {
        order: orderCountTwelveMonths,
        user: userCountTwelveMonths,
        product: productCountTwelveMonths,
        discount: discountCountTwelveMonths,
        revenue: totalCountTwelveMonths,
      };

      // Main Chart

      charts = { lastTwelveMonth };

      // Caching Here =================>>>>>>>>>>>>>>>>>>>>>>>>>>
      myCache.set("admin-line-charts", JSON.stringify(charts));
    }

    res.status(200).json({
      success: true,
      message: "Line Data Fetched Successfull !!",
      charts,
    });
  }
);
