"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = require("./product.model");
const appError_1 = __importDefault(require("../../errors/appError"));
// create product into db
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// get all products
const getAllProductsFromDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // getting product based on category
    const category = req.query.category;
    // eslint-disable-next-line prefer-const
    let query = {};
    if (category) {
        query.category = category;
    }
    const result = yield product_model_1.Product.find(query);
    if (!result || result.length === 0) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product db is empty');
    }
    return result;
});
// get single product
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    return result;
});
// delete product from db
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
// update product into db
const updateProductIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_IMPLEMENTED, 'Could not update product Info');
    }
    return result;
});
const updateStockQuantityIntoDB = (productIds, stockQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePromises = productIds.map((id, ind) => __awaiter(void 0, void 0, void 0, function* () {
        const quantityToUpdate = stockQuantity[ind];
        try {
            // Retrieve current stock quantity
            const product = yield product_model_1.Product.findById(id);
            if (!product) {
                throw new appError_1.default(http_status_1.default.NOT_FOUND, `Product with id ${id} not found`);
            }
            const currentQuantity = product.stockQuantity;
            const newQuantity = currentQuantity - quantityToUpdate;
            // Update stock quantity
            const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, { stockQuantity: newQuantity }, { new: true });
            return updatedProduct;
        }
        catch (error) {
            throw new appError_1.default(http_status_1.default.NOT_MODIFIED, 'cannot modify');
        }
    }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const updatedProducts = yield Promise.all(updatePromises);
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductFromDB,
    updateProductIntoDB,
    updateStockQuantityIntoDB,
};
