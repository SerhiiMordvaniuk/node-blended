import fs from "node:fs/promises";
import { createFakeProduct } from "../utils/createFakeProduct.js";
import { PATH_DB } from "../constants/index.js";

async function generateProducts(number) {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(productsData);
    for (let i = 0; i < number; i += 1) {
      const fakeProduct = createFakeProduct();
      products.push(fakeProduct);
    }
    await fs.writeFile(PATH_DB, JSON.stringify(products, null, 2));
  } catch (error) {
    console.log(error);
  }
}

generateProducts(5);
