import fs from "node:fs/promises";
import { PATH_DB } from "../constants/index.js";

async function getProductsByMinPrice(number) {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productsData);
    const filterProducts = products.filter((item) => item.price >= number);
    console.table(filterProducts);
  } catch (error) {
    console.log(error);
  }
}

getProductsByMinPrice(300);
