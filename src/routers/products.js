import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductsByIdController,
  updateProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:productId', ctrlWrapper(getProductsByIdController));

router.post('/products', ctrlWrapper(createProductController));

router.delete('/products/:productId', ctrlWrapper(deleteProductController));

router.patch(`/products/:productId`, ctrlWrapper(updateProductController));

export default router;
