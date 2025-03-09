import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = () => ProductModel.find();

export const getProductByID = (productId) => ProductModel.findById(productId);

export const createProduct = (productData) => ProductModel.create(productData);

export const deleteProduct = (productId) =>
  ProductModel.findByIdAndDelete(productId);

export const updateProduct = (productId, productData) =>
  ProductModel.findByIdAndUpdate(productId, productData, { new: true });
