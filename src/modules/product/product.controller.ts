import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await ProductServices.updateProductIntoDB(id, updatedData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

const updateStockQuantity = catchAsync(async (req, res) => {
  const { productIds, stockQuantity } = req.body;
  const result = await ProductServices.updateStockQuantityIntoDB(
    productIds,
    stockQuantity,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Stock quantities updated successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
  updateStockQuantity,
};
