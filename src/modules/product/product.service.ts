import { TProduct } from './product.interface';
import { Product } from './product.model';

// create product into db
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
