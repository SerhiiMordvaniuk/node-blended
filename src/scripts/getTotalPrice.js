import fs from "node:fs/promises";
import { PATH_DB } from "../constants/index.js";

async function getTotalPrice() {
  try {
    const productsData = await fs.readFile(PATH_DB, "utf8");
    const product = JSON.parse(productsData);
    const totalPrice = product.reduce(
      (total, item) => (total += Number(item.price)),
      0
    );
    console.log(Number(totalPrice.toFixed(2)));
  } catch (error) {}
}

getTotalPrice();
