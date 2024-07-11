import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import AppError from '../../errors/appError';

// create product into db
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// get all products
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// delete product from db
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// update product into db
const updateProductIntoDB = async (id: string, updateData: object) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      'Could not update product Info',
    );
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductIntoDB,
};
