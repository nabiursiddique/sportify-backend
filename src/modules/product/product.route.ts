import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/:id', ProductControllers.getSingleProduct);
router.delete('/:id', ProductControllers.deleteSingleProduct);
router.patch('/:id', ProductControllers.updateProduct);
// for updating product stock quantities
router.post('/updateStockQuantity', ProductControllers.updateStockQuantity);

export const ProductRoutes = router;
