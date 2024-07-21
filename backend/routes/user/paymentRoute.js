import express from 'express';
import { makePayment } from '../../controller/paymentController.js';
const router = express.Router();

router.post('/',makePayment);


export default router
