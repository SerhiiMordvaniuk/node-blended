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

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', ctrlWrapper(getProductsByIdController));

router.post('/', ctrlWrapper(createProductController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

router.patch(`/:productId`, ctrlWrapper(updateProductController));

export default router;
