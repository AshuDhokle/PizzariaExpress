import express from 'express'
import { getAllOrdersForAdmin, updateOrderById } from '../../controller/ordersController.js';
const router = express.Router();

router.get('/orderList',getAllOrdersForAdmin)
router.put('/:id',updateOrderById);

export default router;