"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
exports.Product = (0, mongoose_1.model)('Product', productSchema);
