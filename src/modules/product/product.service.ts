/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getAllProductsFromDB = async (req: any) => {
  // getting product based on category
  const category = req.query.category as string;

  // eslint-disable-next-line prefer-const
  let query: any = {};
  if (category) {
    query.category = category;
  }

  const result = await Product.find(query);
  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product db is empty');
  }
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return result;
};

// delete product from db
const deleteProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
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

const updateStockQuantityIntoDB = async (
  productIds: any,
  stockQuantity: any,
) => {
  const updatePromises = productIds.map(async (id: string, ind: number) => {
    const quantityToUpdate = stockQuantity[ind];
    try {
      // Retrieve current stock quantity
      const product = await Product.findById(id);
      if (!product) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product with id ${id} not found`,
        );
      }
      const currentQuantity = product.stockQuantity;
      const newQuantity = currentQuantity - quantityToUpdate;

      // Update stock quantity
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { stockQuantity: newQuantity },
        { new: true },
      );

      return updatedProduct;
    } catch (error) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'cannot modify');
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const updatedProducts = await Promise.all(updatePromises);
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductIntoDB,
  updateStockQuantityIntoDB,
};
