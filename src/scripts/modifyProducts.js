import fs from "node:fs/promises";
import { PATH_DB } from "../constants/index.js";

async function modifyProducts() {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productsData);
    const newProducts = products.map(({ description, ...item }) => item);
    await fs.writeFile(PATH_DB, JSON.stringify(newProducts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

modifyProducts();
