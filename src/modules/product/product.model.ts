import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Product = model<TProduct>('Product', productSchema);
