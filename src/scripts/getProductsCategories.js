import fs from "node:fs/promises";
import { PATH_DB } from "../constants/index.js";

async function getProductsCategories() {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productsData);
    const categories = products
      .map((item) => item.category)
      .filter((item, index, array) => array.indexOf(item) === index);
    console.log(categories);
  } catch (error) {
    console.log(error);
  }
}
getProductsCategories();

