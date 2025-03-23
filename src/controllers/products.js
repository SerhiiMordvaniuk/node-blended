import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from '../services/products.js';

export async function getAllProductsController(req, res) {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
}

export async function getProductsByIdController(req, res) {
  const productId = req.params.productId;
  const product = await getProductByID(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
}

export async function createProductController(req, res) {
  const product = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
}

export async function deleteProductController(req, res) {
  const productId = req.params.productId;
  const product = await deleteProduct(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  //   res.status(204).end();
  res.sendStatus(204);
}

export async function updateProductController(req, res) {
  const productId = req.params.productId;
  const product = await updateProduct(productId, req.body);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product,
  });
}
