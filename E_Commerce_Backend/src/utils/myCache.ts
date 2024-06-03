import { myCache } from "../app.js";
import { CategoryModal } from "../models/CategoryModal.js";
import { ProductModal } from "../models/ProductModal.js";

export const revalidateCache = async ({
  product,
  order,
  admin,
  category,
}: {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  category?: boolean;
}) => {
  // For The Product Cashe Clears
  if (product) {
    const product_id = await ProductModal.find({}).select("_id product_slug");
    const Category_name = await CategoryModal.find({}).select("name");

    console.log(product_id, Category_name);

    const productKeys: string[] = [];

    for (let prod of product_id) {
      productKeys.push(`productById_${prod._id}`);
      productKeys.push(`productBySlug_${prod.product_slug}`);
    }
    for (let cate of Category_name) {
      productKeys.push(`productByCategoryName_${cate.name}`);
    }

    const charts = [
      "admin-states",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    for (let chart of charts) {
      productKeys.push(chart);
    }

    myCache.del(productKeys);
  }

  // For The Category Cashe Clears
  if (category) {
    const category_id = await CategoryModal.find({}).select("_id");

    const productKeys: string[] = ["category"];

    for (let cate of category_id) {
      productKeys.push(`categoryById_${cate._id}`);
    }

    const charts = [
      "admin-states",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    for (let chart of charts) {
      productKeys.push(chart);
    }

    myCache.del(productKeys);
  }

  // For The Order Cashe Clears
  if (order) {
    let productKeys: string[] = [];

    const charts = [
      "admin-states",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    for (let chart of charts) {
      productKeys.push(chart);
    }
    myCache.del(productKeys);
  }

  // For The Admin Cashe Clears
  if (admin) {
    let productKeys: string[] = [];

    const charts = [
      "admin-states",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    for (let chart of charts) {
      productKeys.push(chart);
    }
    myCache.del(productKeys);
  }
};
